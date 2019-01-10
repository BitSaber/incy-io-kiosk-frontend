import React from 'react';

import questionService from './service'
import ThankYouPage from './pages/ThankYouPage';
import QuestionPage from './pages/QuestionPage';

const initialState = {
    questions: [],
    currentQuestionID: null,
    currentQuestionChoices: [],
    answers: {},
    isAllQuestionsAnswered: false,
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

    setNextQuestion = async (currentQuestionIndex) => {
        // finds the question that depends on this one
        const newQuestionID =
            this.state.questions.find(
                question => question.depends_on_question_id === this.state.questions[currentQuestionIndex].id
            ).id
        this.setState({
            currentQuestionID: newQuestionID,
        });
        const newChoices = await questionService.getChoices(newQuestionID);
        this.setState({
            currentQuestionChoices: newChoices,
        }); // SUGGESTION: get the choices to all questions beforehand to prevent small delay between questions
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
        const currentQuestionIndex = questions.findIndex(question => question.id === currentQuestionID);

        if (this.moreQuestions(currentQuestionIndex)) { // more questions
            this.setNextQuestion(currentQuestionIndex);
        } else { // no more questions
            this.submitObservation();
        }

    }

    /* Checks if new answer should end this question round .
       NOTE: Assumes that all questions except the start are dependent on a specific answer. */
    moreQuestions = (currentQuestionIndex) => {
        const answers = this.state.answers
        const questions = this.state.questions
        return currentQuestionIndex !== questions.length - 1 && answers !== undefined &&
            // finds the question which depends on the given answer
            questions.find(question => question.depends_on_question_id === questions[currentQuestionIndex].id).
                depends_on_choice_id === answers[questions[currentQuestionIndex].id].id
    } 


    submitObservation = () => {
        const time = new Date().toString().substring(0,21)
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
                isAllQuestionsAnswered: false
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
            />
        );
    }
}

export default App;
