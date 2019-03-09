import React from 'react';
import { string, object, func, bool, shape, array } from 'prop-types';

import questionService from './service'
import ThankYouPage from './pages/ThankYouPage';
import QuestionPage from './containers/QuestionPage';
import {
    SELECT,
    MULTI_SELECT,
    STR,
} from './constants/questionTypes';

/**
 * @description the initial state of the app
 */
const initialState = {
    multiSelectArray: [],
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

        this.setFirstQuestion()
    }


    setFirstQuestion = async () => {
        const { currentLanguageId, setCurrentQuestion, setCurrentChoices } = this.props;
        const { allQuestions } = this.props.questions;

        if (allQuestions.length > 0) {
            const currentQuestion = allQuestions[0];
            setCurrentQuestion(currentQuestion);
            setCurrentChoices(currentQuestion.id, currentLanguageId);
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
        }).flat()
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
        const { currentLanguageId, questions, setCurrentQuestion, setCurrentChoices } = this.props;
        const { allQuestions } = questions;

        const newQuestion = allQuestions.find(question => question.position === newPosition)
        setCurrentQuestion(newQuestion);

        if (newQuestion.type !== STR) {
            setCurrentChoices(newQuestion.id, currentLanguageId);

            // Sets an empty answer array for multi select question
            if (newQuestion.type === MULTI_SELECT) {
                this.setState({
                    multiSelectArray: []
                })
            }
        }
    }

    /**
     * @description saves multiple answers in an array and gives them to submit
     * @param choice saves the choices that are clicked on the screen
     * @returns a changed state with the choices saved in an array
     */
    multiAnswerClick = (choice) => {
        // if the answer was NOT selected before, then adds it to the array
        if (!this.state.multiSelectArray.map(object => object.id).includes(choice.id)) {
            const newChoice = [{ id: choice.id }]
            this.setState((previousState) => {
                return {
                    ...previousState,
                    multiSelectArray: previousState.multiSelectArray.concat(newChoice)
                }
            })
        } else {
            // if the answer WAS selected before, then removes it from the array
            const pos = this.state.multiSelectArray.map(object => object.id).indexOf(choice.id)
            const newMultiSelectArray = this.state.multiSelectArray.filter((_, i) => i !== pos)
            this.setState((previousState) => {
                return {
                    multiSelectArray: newMultiSelectArray,
                    ...previousState,
                }
            })
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
     * @description submits multi answers saved in an array
     * @returns moves to the next questions
     */
    submitMultiAnswer = async () => {
        const { addAnswer, questions } = this.props;
        const { currentQuestion } = questions;

        const { multiSelectArray } = this.state;
        // If the questions is required it shows the required field
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


    /**
    * @description submits the observations and shows the next question
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
     * @description checks what type question is and calls the right function for the type
     */
    handleChoiceClick = (choice) => {
        const { currentQuestion } = this.props.questions;
        if (currentQuestion.type === SELECT) {
            this.singleAnswerClick(choice)
        } else if (currentQuestion.type === MULTI_SELECT) {
            this.multiAnswerClick(choice)
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
    setCurrentChoices: func.isRequired,
    choices: object.isRequired,
}

export default App;
