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
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    async componentDidMount() {
        this.setFirstQuestion();
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
        const newQuestionID = this.state.questions[currentQuestionIndex + 1].id;
        this.setState({
            currentQuestionID: newQuestionID,
        });
        const newChoices = await questionService.getChoices(newQuestionID);
        this.setState({
            currentQuestionChoices: newChoices,
        });
    }

handleChoiceClick = async (choice) => {
        this.setState((previousState) => {
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

        if (currentQuestionIndex !== questions.length - 1) { // more questions
            this.setNextQuestion(currentQuestionIndex);
        } else { // no more questions 
            this.submitObservation();
        }

    }

    submitObservation = () => {
        // TODO POST observation
        this.setState({
            isAllQuestionsAnswered: true,
        });
        setTimeout(() => {
            this.setState({
                ...initialState
            });
            this.setFirstQuestion();
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
