import React from 'react';
import { string, object, func, shape, array } from 'prop-types';

import questionService from './service'
import ThankYouPage from './pages/ThankYouPage';
import QuestionPage from './pages/QuestionPage';
import {
    SELECT,
    MULTI_SELECT,
    STR,
} from './constants/questionTypes';

const initialState = {
    currentQuestionChoices: [],
    isAllQuestionsAnswered: false,
    areAllQuestionsDisplayed: false,
    multiSelectArray: [],
    error: null
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    async componentDidMount() {

        const { setFunfacts, setQuestions, currentLanguageId } = this.props;
        await setFunfacts(currentLanguageId)
        await setQuestions(currentLanguageId);

        this.setFirstQuestion()
    }


    setFirstQuestion = async () => {
        const { currentLanguageId, setCurrentQuestion } = this.props;
        const { allQuestions } = this.props.questions;

        if (allQuestions.length > 0) {
            const currentQuestion = allQuestions[0];
            setCurrentQuestion(currentQuestion);

            const choices = await questionService.getChoices(currentQuestion.id, currentLanguageId);

            this.setState({
                currentQuestionChoices: choices,
            });
        }
    }

    checkNextQuestion = (position) => {
        const { allQuestions } = this.props.questions;

        //makes an array with all answer ID's
        const answerIDs = Object.values(this.props.answers).map(function (object) {
            if (Array.isArray(object)) {
                return object.map(x => x.id)
            }
            else {
                return object.id
            }
        }).flat()
        const nextQuestion = allQuestions.find(question => question.position === position)
        if (nextQuestion.depends_on_question_id === null) {
            return true
        } else if (answerIDs.includes(nextQuestion.depends_on_choice_id)) {
            return true
        } else {
            return false
        }
    }

    setNextQuestion = async () => {
        const { allQuestions, currentQuestion } = this.props.questions;
        // finds the next question to display
        const questionsLen = allQuestions.length
        var position = allQuestions.find(
            question => question.id === currentQuestion.id).position + 1
        var flag = true
        // Loop through the questions by position, and determine if the question at hand needs to be displayed
        while (position <= questionsLen && flag) {
            if (this.checkNextQuestion(position)) {
                flag = false
                this.setQuestion(position)
            } else {
                position += 1
            }
        }
        // Check if the last displayed question still needs an answer, or if the thank you page can be displayed
        if (position >= questionsLen) {
            this.state.areAllQuestionsDisplayed = true
            if (flag) {
                this.state.isAllQuestionsAnswered = true
            }
        }
    }

    setQuestion = async (newPosition) => {
        const { currentLanguageId, questions, setCurrentQuestion } = this.props;
        const { allQuestions } = questions;

        const newQuestion = allQuestions.find(question => question.position === newPosition)
        setCurrentQuestion(newQuestion);

        if (newQuestion.type !== STR) {
            const newChoices = await questionService.getChoices(newQuestion.id, currentLanguageId);

            // Sets an empty answer array for multi select question
            if (newQuestion.type === MULTI_SELECT) {
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

        if (!this.state.multiSelectArray.map(object => object.id).includes(choice.id)) {
            const newChoice = [{ id: choice.id }]
            this.setState((previousState) => {
                return {
                    ...previousState,
                    multiSelectArray: previousState.multiSelectArray.concat(newChoice)
                }
            })
        } else {
            const pos = this.state.multiSelectArray.map(object => object.id).indexOf(choice.id)
            const newMultiSelectArray = this.state.multiSelectArray.filter((_, i) => i !== pos)
            this.setState((previousState) => {
                return {
                    ...previousState,
                    multiSelectArray: newMultiSelectArray
                }
            })
        }
    }

    showFieldRequired = () => {
        if (!this.state.error) {
            this.setState({ error: true });
            setTimeout(() => {
                this.setState({ error: null });
            }, 3000);
        }
    }

    submitTextAnswer = async (text) => {
        const { addAnswer, questions } = this.props;
        const { currentQuestion } = questions;

        if (('' + text).trim() === '' && currentQuestion.required) {
            this.showFieldRequired();
        } else {
            await addAnswer({
                questionId: currentQuestion.id,
                answer: text,
            });
            this.moveToNextQuestion();
        }
    }

    submitMultiAnswer = async () => {
        const { addAnswer, questions } = this.props;
        const { currentQuestion } = questions;

        const { multiSelectArray } = this.state;
        if (multiSelectArray.length === 0 && currentQuestion.required) {
            this.showFieldRequired()
        } else {
            await addAnswer({
                questionId: currentQuestion.id,
                answer: multiSelectArray,
            });
            this.moveToNextQuestion()
        }
    }

    singleAnswerClick = async (choice) => {
        const { addAnswer, questions } = this.props;
        const { currentQuestion } = questions;

        await addAnswer({
            questionId: currentQuestion.id,
            answer: {
                id: choice.id
            },
        })

        this.moveToNextQuestion()
    }

    moveToNextQuestion = () => {
        const { allQuestions, currentQuestion } = this.props.questions;
        const position = allQuestions.findIndex(question => question.id === currentQuestion.id);

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
        const { currentQuestion } = this.props.questions;
        if (currentQuestion.type === SELECT) {
            this.singleAnswerClick(choice)
        } else if (currentQuestion.type === MULTI_SELECT) {
            this.multiAnswerClick(choice)
        }
    }

    submitObservation = () => {
        const { answers, resetAnswers, funfacts } = this.props;
        const time = new Date().toString().substring(0, 21)
        const data = {
            occurred_at: time,
            place: funfacts.place[0].id,
            deadline: null,
            category: funfacts.category[0].id,
            answers: answers
        }

        questionService.postObservation(data);
        resetAnswers();

        this.setState({
            isAllQuestionsAnswered: true,
        });

        this.props.setFunfacts(this.props.currentLanguageId);
        this.setFirstQuestion();

        setTimeout(() => {
            this.setState({
                isAllQuestionsAnswered: false,
                areAllQuestionsDisplayed: false
            });
        }, 3000);
    }

    render() {
        const { allQuestions, currentQuestion } = this.props.questions;

        if (!currentQuestion) {
            return null;
        }

        const question = allQuestions.find(question => question.id === currentQuestion.id);
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
                questionType={currentQuestion.type}
                onSubmitMultiClick={this.submitMultiAnswer}
                onSubmitFreeText={this.submitTextAnswer}
                questionPos={allQuestions.findIndex(question => question.id === currentQuestion.id)}
                error={this.state.error}
                currentIsRequired={currentQuestion.required}
                skipClick={this.moveToNextQuestion}
            />
        );
    }
}

App.propTypes = {
    currentLanguageId: string.isRequired,
    answers: object.isRequired,
    addAnswer: func.isRequired,
    resetAnswers: func.isRequired,
    questions: shape({
        allQuestions: array.isRequired,
        currentQuestion: object,
    }).isRequired,
    setQuestions: func.isRequired,
    setCurrentQuestion: func.isRequired,
    funfacts: shape({
        place: array.isRequired,
        category: array.isRequired,
    }),
    setFunfacts: func.isRequired,
}

export default App;
