import React from 'react';
import { string, object, func, bool, shape, array } from 'prop-types';

import questionService from '../service';
import ThankYouPage from '../components/ThankYouPage';
import QuestionPage from '../containers/QuestionPage';
import {
    SELECT,
    STR,
} from '../constants/questionTypes';

class App extends React.Component {

    /**
     * @description sets up the context of the questionnaire,
     * fetches the questions and sets up the first question when the page is first loaded
     */
    async componentDidMount() {
        const { setCategory, setPlace, setQuestions,
            currentLanguageId, getAllChoices, questions } = this.props;
        await setCategory(currentLanguageId);
        await setPlace(currentLanguageId);
        await setQuestions(currentLanguageId);

        await getAllChoices(questions.allQuestions, currentLanguageId);
        this.setFirstQuestion();
        console.log(questions.allQuestions);
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
            error: shape({
                showError: bool.isRequired,
                messageId: string.isRequired,
            }).isRequired,
        }).isRequired,
        setAllAnswered: func.isRequired,
        setShowError: func.isRequired,
        setErrorMsg: func.isRequired,
        setCurrentQuestion: func.isRequired,
        context: shape({
            place: array.isRequired,
            category: array.isRequired,
        }),
        setCategory: func.isRequired,
        setPlace: func.isRequired,
        setCurrentChoices: func.isRequired,
        getAllChoices: func.isRequired,
        choices: object.isRequired,
        resetText: func.isRequired,
    }

    setFirstQuestion = async () => {
        const { currentLanguageId, setCurrentQuestion, setCurrentChoices } = this.props;
        const { allQuestions } = this.props.questions;

        if (allQuestions.length > 0) {
            const currentQuestion = allQuestions[0];
            setCurrentQuestion(currentQuestion);
            if (currentQuestion.type !== STR) {
                setCurrentChoices(currentQuestion.id, currentLanguageId);
            }
        }
    }

    /**
     * @description showing the question as required on screen
     */
    showFieldRequired = () => {
        const { setShowError, setErrorMsg } = this.props;
        setErrorMsg("questionpage.required");
        if (!this.props.flags.showError) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    }
    /**
     * @description submits the text answer to the answers in the initial state
     */
    submitTextAnswer = async (text) => {
        const { addAnswer, questions, resetText } = this.props;
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
            resetText();
            this.moveToNextQuestion();
        }
    }


    /**
     * @description simply adds the chosen choice to the
     * answers array and moves to the next question
     */
    singleAnswerClick = async (choice) => {
        const { addAnswer, questions } = this.props;
        const { currentQuestion } = questions;

        await addAnswer({
            questionId: currentQuestion.id,
            answer: {
                id: choice.id,
            },
        });

        this.moveToNextQuestion();
    }

    /**
     * @description Moves the questionnaire to the next question, or submits the answers if no more questions to be answered.
     */
    moveToNextQuestion = async () => {
        const {
            questions,
            setCurrentQuestion,
            setCurrentChoices,
            currentLanguageId,
            resetText,
        } = this.props;
        const { allQuestions, currentQuestion } = questions;
        if (currentQuestion.type === STR)
            resetText();

        const nextPos = this.findNextQuestionPosition();

        if (nextPos !== null) {
            const nextQuestion = allQuestions.find(question => question.position === nextPos);
            setCurrentChoices(nextQuestion.id, currentLanguageId);
            setCurrentQuestion(nextQuestion);
        } else {
            this.submitObservation();
        }
    }

    /**
     * @description finds the position of the next question and returns it. If no more questions to display, returns null
     */
    findNextQuestionPosition = () => {
        const {
            questions,
            answers,
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

        let nextQuestionPosition = currentQuestion.position + 1;

        while (nextQuestionPosition <= allQuestions.length) {
            const nextQuestion = allQuestions.find(question => question.position === nextQuestionPosition);
            if (nextQuestion) {
                if (nextQuestion.depends_on_choice_id === null) {
                    // next question is not dependent on a previous selected choice => the question is shown
                    return nextQuestionPosition;
                } else if (answeredChoiceIds.includes(nextQuestion.depends_on_choice_id)) {
                    // next question is dependent on a previously selected choice => the question is shown
                    return nextQuestionPosition;
                }
            }
            nextQuestionPosition += 1;
        }

        return null; // Returns null if while loop doesn't return a question postion - this means that no more questions to display
    }


    /**
     * @description calls `singleAnswerClick` for single select type questions,
     * else does nothing
     */
    handleChoiceClick = (choice) => {
        if (this.props.questions.currentQuestion.type === SELECT) {
            this.singleAnswerClick(choice);
        }
    }

    /**
     * @description POSTs the necessary data of the observation to the API and
     * transitions the program to `ThankYouPage` for 3 seconds, during which
     * the state is reset so that a new questionnaire can be started
     */
    submitObservation = () => {
        const { answers, resetAnswers, setAllAnswered, context } = this.props;

        const time = new Date().toString().substring(0, 21);
        const data = {
            occurred_at: time,
            place: context.place[0].id,
            deadline: null,
            category: context.category[0].id,
            answers: answers,
        };
        // calls the service.js postObservation to API
        questionService.postObservation(data);
        resetAnswers();

        setAllAnswered(true);
        this.setFirstQuestion();

        setTimeout(() => {
            setAllAnswered(false);
        }, 3000);
    }

    render() {
        const { allQuestions, currentQuestion } = this.props.questions;
        const { currentChoices } = this.props.choices;

        if (!currentQuestion) {
            return null;
        }

        if (this.props.flags.isAllQuestionsAnswered) {
            return <ThankYouPage />;
        }

        return (
            <QuestionPage
                question={currentQuestion}
                questionChoices={currentChoices}
                onChoiceClick={this.handleChoiceClick}
                questionType={currentQuestion.type}
                onSubmitFreeText={this.submitTextAnswer}
                questionPos={allQuestions.findIndex(question => question.id === currentQuestion.id)}
                error={this.props.flags.error}
                currentIsRequired={currentQuestion.required}
                moveToNextQuestion={this.moveToNextQuestion}
                showFieldRequired={this.showFieldRequired}
            />
        );
    }
}

export default App;
