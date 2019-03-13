import React from 'react';
import { string, object, func, bool, shape, array } from 'prop-types';

import questionService from '../service'
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
        const { setCategory, setPlace, setQuestions, currentLanguageId } = this.props;
        await setCategory(currentLanguageId);
        await setPlace(currentLanguageId);
        await setQuestions(currentLanguageId);

        this.setFirstQuestion()
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
            isAllQuestionsDisplayed: bool.isRequired,
            error: shape({
                showError: bool.isRequired,
                messageId: string.isRequired,
            }).isRequired,
        }).isRequired,
        setAllAnswered: func.isRequired,
        setAllDisplayed: func.isRequired,
        setShowError: func.isRequired,
        setErrorMsg: func.isRequired,
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
            setAvailableChoices(currentQuestion.id, currentLanguageId);
        }
    }

    /**
     * @description Checks if next question should be shown or not
     * @param position current question position
     * @returns true if next question should be shown, else {false}
     */
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
        })
            .flat()
        const nextQuestion = allQuestions.find(question => question.position === position)
        if (nextQuestion.depends_on_question_id === null) {
            // next question is not dependent on any previous choice => question is shown
            return true;
        } else if (answerIDs.includes(nextQuestion.depends_on_choice_id)) {
            // next question is dependent on previous choice that was selected => question is shown
            return true;
        } else {
            // next question is dependent on a choice that was not selected => question is not shown
            return false;
        }
    }

    /**
     * @description sets the next question visible on the screen
     */
    setNextQuestion = async () => {
        const { questions: { allQuestions, currentQuestion }, setAllAnswered, setAllDisplayed } = this.props;
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
            setAllDisplayed(true)
            if (flag) {
                setAllAnswered(true)
            }
        }
    }

    /**
     * @description sets the new question
     * @param newPosition the position of the new question
    */
    setQuestion = async (newPosition) => {
        const { currentLanguageId, questions, setCurrentQuestion, setAvailableChoices } = this.props;
        const { allQuestions } = questions;

        const newQuestion = allQuestions.find(question => question.position === newPosition)
        setCurrentQuestion(newQuestion);

        if (newQuestion.type !== STR) {
            setAvailableChoices(newQuestion.id, currentLanguageId);
        }
    }

    /**
     * @description showing the question as required on screen
     */
    showFieldRequired = () => {
        const { setShowError, setErrorMsg } = this.props
        setErrorMsg("questionpage.required")
        if (!this.props.flags.showError) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
        }
    }
    /**
     * @description submits the text answer to the answers in the initial state
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
     * @description simply adds the chosen choice to the
     * answers array and moves to the next question
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


    /**
    * @description submits the observation if the questionnaire is finished,
    * else moves to next question
    */
    moveToNextQuestion = async () => {
        const { allQuestions, currentQuestion } = this.props.questions;
        const position = allQuestions.findIndex(question => question.id === currentQuestion.id);

        if (!this.props.flags.isAllQuestionsDisplayed) { // more questions
            await this.setNextQuestion(position);
            if (this.props.flags.isAllQuestionsDisplayed && this.props.flags.isAllQuestionsAnswered) {
                this.submitObservation()
            }
        } else { // no more questions
            this.submitObservation();
        }
    }


    /**
     * @description calls `singleAnswerClick` for single select type questions,
     * else does nothing
     */
    handleChoiceClick = (choice) => {
        if (this.props.questions.currentQuestion.type === SELECT) {
            this.singleAnswerClick(choice)
        }
    }

    /**
     * @description POSTs the necessary data of the observation to the API and
     * transitions the program to `ThankYouPage` for 3 seconds, during which
     * the state is reset so that a new questionnaire can be started
     */
    submitObservation = () => {
        const { answers, resetAnswers, setAllAnswered, setAllDisplayed, context } = this.props;

        const time = new Date().toString()
            .substring(0, 21)
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
                error={this.props.flags.error}
                currentIsRequired={currentQuestion.required}
                moveToNextQuestion={this.moveToNextQuestion}
                showFieldRequired={this.showFieldRequired}
            />
        );
    }
}

export default App;
