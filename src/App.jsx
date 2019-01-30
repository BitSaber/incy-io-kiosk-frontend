import React from 'react';
import FreeText from './components/FreeText'
import questionService from './service'
import ThankYouPage from './pages/ThankYouPage';
import QuestionPage from './pages/QuestionPage';

const initialState = {
    questions: [],
    currentQuestionID: null,
    currentQuestionChoices: [],
    answers: {},
    isAllQuestionsAnswered: false,
    areAllQuestionsDisplayed: false,
    categoryId: null,
    placeId: null
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
        this.setState({
            currentQuestionChoices: choices,
        });
    }

    checkNextQuestion = (position) => {
        //const questionsLen = this.state.questions.length
        const answerKeys = this.state.answers
        console.log(answerKeys["5090"])
        const nextQuestion = this.state.questions.find(question => question.position === position)
        if (nextQuestion.depends_on_question_id === null) {
            return true
        }
        else if (answerKeys[nextQuestion.depends_on_question_id] !== undefined &&
            answerKeys[nextQuestion.depends_on_question_id]["id"] === nextQuestion.depends_on_choice_id) {
            console.log('Jeejeejee');
            return true
        }
        else {
            false
        }
    }

    setNextQuestion = () => {
        // finds the question that depends on this one
        const questionsLen = this.state.questions.length
        var position = this.state.questions.find(question => question.id === this.state.currentQuestionID).position + 1
        var flag = true
        while (position <= questionsLen && flag) {
            if (this.checkNextQuestion(position)) {
                flag = false
                console.log('posBeforeCall: ', position)
                this.setQuestion(position)
            }
            else {
                position += 1
            }
        }
        if (position === questionsLen) {
            this.state.areAllQuestionsDisplayed = true
        }
        else if (position > questionsLen) {
            this.state.areAllQuestionsDisplayed = true
            this.state.isAllQuestionsAnswered = true
        }
    }

    setQuestion = async (newPosition) => {
        const newQuestionID = this.state.questions.find(question => question.position === newPosition).id
        console.log(newQuestionID)
        this.setState({
            currentQuestionID: newQuestionID
        });
        const newChoices = await questionService.getChoices(newQuestionID);
        this.setState({
            currentQuestionChoices: newChoices
        })
    }

    handleTextClick = async (text) => {
        await this.setState((previousState) => {
            return {
                ...previousState,
                answers: {
                    ...previousState.answers,
                    [previousState.currentQuestionID]: text
                }
            }
        });
        console.log(this.state.answers)
        this.setNextQuestion()
    }


    handleChoiceClick = async (choice) => {
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

    /* Checks if new answer should end this question round .
       NOTE: Assumes that all questions except the start are dependent on a specific answer. */
    moreQuestions = (position) => {
        const answers = this.state.answers
        const questions = this.state.questions
        const questionsLength = questions.length
        return position !== questions.length - 1 && answers !== undefined &&
            // finds the question which depends on the given answer
            questions.find(question => question.depends_on_question_id === questions[position].id).
                depends_on_choice_id === answers[questions[position].id].id
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
            /*   <QuestionPage
                   question={question}
                   questionChoices={this.state.currentQuestionChoices}
                   onChoiceClick={this.handleChoiceClick}
               />*/
            <FreeText
                question={question}
                onChoiceClick={this.handleTextClick}
            />

        );
    }
}

export default App;
