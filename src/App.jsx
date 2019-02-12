import React from 'react';
import questionService from './service'
import ThankYouPage from './pages/ThankYouPage';
import QuestionPage from './pages/QuestionPage';

const initialState = {
    questions: [],
    currentQuestionID: null,
    currentQuestionType: 'not gotten yet',
    currentQuestionChoices: [],
    answers: {},
    isAllQuestionsAnswered: false,
    areAllQuestionsDisplayed: false,
    categoryId: null,
    placeId: null,
    multiSelectArray: []
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    async componentDidMount() {
        this.setFirstQuestion();
        this.setCatAndLoc();
    }

    setCatAndLoc = async () => {
        const cat = await questionService.getCategory()
        const loc = await questionService.getPlace()
        this.setState({
            category: cat[0].id,
            place: loc[0].id,
        });
    }

    setFirstQuestion = async () => {
        const questions = await questionService.getQuestions();
        const currentQuestionID = questions[0].id;
        this.setState({
            questions: questions,
            currentQuestionID: currentQuestionID,
        });
        const choices = await questionService.getChoices(currentQuestionID);
        const questionType = questions[0].type
        this.setState({
            currentQuestionChoices: choices,
            currentQuestionType: questionType
        });
    }

    checkNextQuestion = (position) => {
        const answerKeys = this.state.answers
        const nextQuestion = this.state.questions.find( question => question.position === position)
        if ( nextQuestion.depends_on_question_id === null ) {
            return true
        } else if ( answerKeys[nextQuestion.depends_on_question_id] !== undefined &&
                    answerKeys[nextQuestion.depends_on_question_id]["id"] === nextQuestion.depends_on_choice_id  ) {
            return true
        } else {
            return false
        }
    }

    setNextQuestion = async () => {
        // finds the next question to display
        const questionsLen = this.state.questions.length
        var position = this.state.questions.find(
            question => question.id === this.state.currentQuestionID).position + 1
        var flag = true
        // Loop through the questions by position, and determine if the question at hand needs to be displayed
        while ( position <= questionsLen && flag ) {
            if (this.checkNextQuestion(position)) {
                flag = false
                this.setQuestion(position)
            } else {
                position += 1
            }
        }
        // Check if the last displayed question still needs an answer, or if the thank you page can be displayed
        if (position >= questionsLen && !flag) {
            this.state.areAllQuestionsDisplayed = true
        } else if (position >= questionsLen && flag) {
            this.state.areAllQuestionsDisplayed = true
            this.state.isAllQuestionsAnswered = true
        }
    }

    setQuestion = async (newPosition) => {
        // Sets the question with the predetermined position as the new current question and gets the questions choices from the API.
        const newQuestionID = this.state.questions.find( question => question.position === newPosition).id
        const questionType = this.state.questions.find(question => question.id === newQuestionID).type
        this.setState({
            currentQuestionID: newQuestionID,
            currentQuestionType: questionType
        });

        if (this.state.currentQuestionType !== 'str') {
            const newChoices = await questionService.getChoices(newQuestionID);

            // Sets an empty answer array for multi select question
            if (this.state.currentQuestionType === 'multi-select') {
                this.setState({
                    currentQuestionChoices: newChoices,
                    multiSelectArray: []
                })
            } else {
                this.setState({
                    currentQuestionChoices: newChoices
                })
            }
        }
    }

    multiAnswerClick = (choice) => {
        // this is supposed to handle adding new choices to an array
        // which is then give to submitMultiClick when asnwerer is finished

        if ( !this.state.multiSelectArray.map(object => object.id).includes(choice.id) ) {
            const newChoice = [{id: choice.id}]

            this.setState( (previousState) => {
                return {
                    ...previousState,
                    multiSelectArray: previousState.multiSelectArray.concat(newChoice)
                }
            })
        } else {
            const pos = this.state.multiSelectArray.map(object => object.id).indexOf(choice.id)
            var newMultiSelectArray = this.state.multiSelectArray
            newMultiSelectArray.splice(pos, 1)
            this.setState( (previousState) => {
                return {
                    ...previousState,
                    multiSelectArray: newMultiSelectArray
                }
            })
        }
    }

    submitTextAnswer = async (text) => {
        await this.setState((previousState) => {
            return {
                ...previousState,
                answers: {
                    ...previousState.answers,
                    [previousState.currentQuestionID]: text
                }
            }
        });
        this.setNextQuestion()
    }

    submitMultiClick = async () => {
        // Sets the answer objects state when submitting multi select question
        await this.setState((previousState) => {
            return {
                ...previousState,
                answers: {
                    ...previousState.answers,
                    [previousState.currentQuestionID]: this.state.multiSelectArray
                }
            }
        })
        this.moveToNextQuestion()
    }

    singleAnswerClick = async (choice) => {
        await this.setState((previousState) => {
            return {
                ...previousState,
                answers: {
                    ...previousState.answers,
                    [previousState.currentQuestionID]: {
                        id: choice.id
                    }
                }
            }
        });
        this.moveToNextQuestion()
    }

    moveToNextQuestion = () => {
        const { currentQuestionID, questions } = this.state;
        const position = questions.findIndex(question => question.id === currentQuestionID);
        if (!this.state.areAllQuestionsDisplayed) { // more questions
            this.setNextQuestion(position);
            if (this.state.areAllQuestionsDisplayed && this.state.isAllQuestionsAnswered) {
                this.submitObservation()
            }
        } else { // no more questions
            this.submitObservation();
        }
    }

    handleChoiceClick = (choice) => {
        if (this.state.currentQuestionType === 'select') {
            this.singleAnswerClick(choice)
        } else if (this.state.currentQuestionType === 'multi-select') {
            this.multiAnswerClick(choice) // should moveToNextQuestion only when pressed 'ready' or 'submit' or whatever
        }
    }

    submitObservation = () => {
        const time = new Date().toString().substring(0, 21)
        const place = this.state.place
        const answers = this.state.answers
        const category = this.state.category
        const data = {
            occurred_at: time,
            place: place,
            deadline: null,
            category: category,
            answers: answers
        }

        questionService.postObservation(data);

        this.setState({
            answers: {}, // prevents the previous answers from being POSTed
            isAllQuestionsAnswered: true,
        });

        this.setFirstQuestion();
        this.setCatAndLoc();

        setTimeout(() => {
            this.setState({
                isAllQuestionsAnswered: false,
                areAllQuestionsDisplayed: false
            });
        }, 3000);
    }

    render() {
        const question = this.state.questions.find(question => question.id === this.state.currentQuestionID);
        // question is undefined and we are waiting for it from the server
        if (!question) {
            return null;
        }

        if (this.state.isAllQuestionsAnswered) {
            return <ThankYouPage />;
        }

        return (

            <QuestionPage
                question={question}
                questionChoices={this.state.currentQuestionChoices}
                onChoiceClick={this.handleChoiceClick}
                questionType={this.state.currentQuestionType}
                onSubmitMultiClick={this.submitMultiClick}
                onSubmitFreeText={this.submitTextAnswer}
            />
        );
    }
}

export default App;
