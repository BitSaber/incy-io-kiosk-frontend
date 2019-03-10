import React from 'react';
import { string, object, func, bool, shape, array } from 'prop-types';

import questionService from '../service'
import ThankYouPage from '../pages/ThankYouPage';
import QuestionPage from '../containers/QuestionPage';
import {
    SELECT,
    STR,
} from '../constants/questionTypes';

/**
 * @description the initial state of the app
 */
const initialState = {
    error: null
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    async componentDidMount() {
        const { setCategory, setPlace, setQuestions, currentLanguageId } = this.props;
        await setCategory(currentLanguageId);
        await setPlace(currentLanguageId);
        await setQuestions(currentLanguageId);

        this.setFirstQuestion();
    }


    static propTypes = {
        currentLanguageId: string.isRequired,
        answers: object.isRequired,
        addAnswer: func.isRequired,
        resetAnswers: func.isRequired,
        questions: shape({
            allQuestions: array.isRequired,
            currentQuestion: object,
        }).isRequired,
        setQuestions: func.isRequired,
        flags: shape({
            isAllQuestionsAnswered: bool.isRequired,
            isAllQuestionsDisplayed: bool.isRequired
        }).isRequired,
        setAllAnswered: func.isRequired,
        setAllDisplayed: func.isRequired,
        setCurrentQuestion: func.isRequired,
        context: shape({
            place: array.isRequired,
            category: array.isRequired,
        }),
        setCategory: func.isRequired,
        setPlace: func.isRequired,
        setAvailableChoices: func.isRequired,
        choices: object.isRequired,
    }

    setFirstQuestion = async () => {
        const { currentLanguageId, setCurrentQuestion, setAvailableChoices } = this.props;
        const { allQuestions } = this.props.questions;

        if (allQuestions.length > 0) {
            const currentQuestion = allQuestions[0];
            setCurrentQuestion(currentQuestion);
            if (currentQuestion.type !== STR) {
                setAvailableChoices(currentQuestion.id, currentLanguageId);
            }
        }
    }

    /**
     * @description showing the question as required on screen
     */
    showFieldRequired = () => {
        if (!this.state.error) {
            // setting the error to be true
            this.setState({ error: 'This question is required' });
            setTimeout(() => {
                this.setState({ error: null });
            }, 3000);
        }
    }
    /**
     * @description subtmits the text answer to the answers in the initial state
     * @returns new function moving to the next question
     */
    submitTextAnswer = async (text) => {
        const { addAnswer, questions } = this.props;
        const { currentQuestion } = questions;

        // checks if the text question is required and shows the required field in that case
        if (('' + text).trim() === '' && currentQuestion.required) {
            this.showFieldRequired();
        } else {
            // otherwise changes the state and saves the text
            await addAnswer({
                questionId: currentQuestion.id,
                answer: text,
            });
            this.moveToNextQuestion();
        }
    }


    /**
     * @description simply answers an question and moves to next
     */
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

    moveToNextQuestion = async () => {
        const {
            questions,
            answers,
            setCurrentQuestion,
            setAvailableChoices,
            currentLanguageId
        } = this.props;
        const { allQuestions, currentQuestion } = questions;

        const answeredChoiceIds = Object.values(answers).map(object => {
            if (Array.isArray(object)) {
                return object.map(x => x.id);
            }
            else {
                return object.id;
            }
        }).flat();

        const currentQuestionPosition = currentQuestion.position;
        const nextQuestion = allQuestions.find(question => question.position === currentQuestionPosition + 1);

        let showNextQuestion = false;

        if (nextQuestion) { // there is a next question
            if (nextQuestion.depends_on_choice_id === null) {
                // next question is not dependent on a previous selected choice => the question is shown
                showNextQuestion = true;
            } else if (answeredChoiceIds.includes(nextQuestion.depends_on_choice_id)) {
                // next question is dependent on a previously selected choice => the question is shown
                showNextQuestion = true;
            }
            if (showNextQuestion) {
                setCurrentQuestion(nextQuestion);
                if (nextQuestion.type !== STR) {
                    setAvailableChoices(nextQuestion.id, currentLanguageId);
                }
            } else {
                this.submitObservation();
            }
        } else {
            this.submitObservation();
        }
    }


    /**
     * @description checks what type question is and calls the right function for the type
     */
    handleChoiceClick = (choice) => {
        const { currentQuestion } = this.props.questions;
        if (currentQuestion.type === SELECT) {
            this.singleAnswerClick(choice)
        }
    }

    /**
     * @description submits the observation to the API and POSTs it
     */
    submitObservation = () => {
        const { answers, resetAnswers, setAllAnswered, setAllDisplayed, context } = this.props;

        const time = new Date().toString().substring(0, 21)
        const data = {
            occurred_at: time,
            place: context.place[0].id,
            deadline: null,
            category: context.category[0].id,
            answers: answers
        }
        // calls the service.js postObservation to API
        questionService.postObservation(data);
        resetAnswers();

        setAllAnswered(true);

        this.setFirstQuestion();

        setTimeout(() => {
            setAllAnswered(false);
            setAllDisplayed(false);
        }, 3000);
    }

    render() {
        const { allQuestions, currentQuestion } = this.props.questions;
        const { availableChoices } = this.props.choices;

        if (!currentQuestion) {
            return null;
        }

        if (this.props.flags.isAllQuestionsAnswered) {
            return <ThankYouPage />;
        }

        return (
            <QuestionPage
                question={currentQuestion}
                questionChoices={availableChoices}
                onChoiceClick={this.handleChoiceClick}
                questionType={currentQuestion.type}
                onSubmitFreeText={this.submitTextAnswer}
                questionPos={allQuestions.findIndex(question => question.id === currentQuestion.id)}
                error={this.state.error}
                currentIsRequired={currentQuestion.required}
                moveToNextQuestion={this.moveToNextQuestion}
                showFieldRequired={this.showFieldRequired}
            />
        );
    }
}

export default App;
