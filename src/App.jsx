import React from 'react';
import questionService from './service'
import ThankYouPage from './pages/ThankYouPage';
import QuestionPage from './pages/QuestionPage';

import {
    SELECT,
    MULTI_SELECT,
    STR,
    UNINITIALIZED as QUESTION_TYPE_UNINITIALIZED
} from './constants/questionTypes';

/**
 * @description creates the initial state of the app
 * @returns array with multiple states
 */
const initialState = {
    questions: [],
    currentQuestionID: null,
    currentQuestionType: QUESTION_TYPE_UNINITIALIZED,
    currentQuestionChoices: [],
    currentIsRequired: false,
    answers: {},
    isAllQuestionsAnswered: false,
    areAllQuestionsDisplayed: false,
    categoryId: null,
    placeId: null,
    multiSelectArray: [],
    error: null
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
    /**
     * @description calls setCatAndLoc function retrieving questions from organisations API 
     */
    setCatAndLoc = async () => {
        const cat = await questionService.getCategory()
        const loc = await questionService.getPlace()
        this.setState({
            category: cat[0].id,
            place: loc[0].id,
        });
    }


    /**
     * @description waits for API answers and sets currentQuestion to be first and required
     */
    setFirstQuestion = async () => {
        // sets first question and awaits questionsService
        const questions = await questionService.getQuestions();
        const currentQuestionID = questions[0].id;
        const isReq = questions[0].required
        // changing initialStates
        this.setState({
            questions: questions,
            currentQuestionID: currentQuestionID,
            currentIsRequired: isReq,
        });
        // awaiting the choices from service.js
        const choices = await questionService.getChoices(currentQuestionID);
        const questionType = questions[0].type
        this.setState({
            currentQuestionChoices: choices,
            currentQuestionType: questionType
        });
    }

    /**
     * @description Checks if next question should be shown or not
     * @param position current question position
     * @returns true if next question should be shown, else {false}
     */
    checkNextQuestion = (position) => {
        // makes an array with all answer ID's
        const allAnsweredAnswerIDs = Object.values(this.state.answers).map(function (object) {
            if (Array.isArray(object)) {
                return object.map(x => x.id)
            }
            else {
                return object.id
            }
        }).flat()
        const nextQuestion = this.state.questions.find(question => question.position === position)
        if (nextQuestion.depends_on_question_id === null) {
            // next question is not dependent on any previous choice => question is shown
            return true;
        } else if (allAnsweredAnswerIDs.includes(nextQuestion.depends_on_choice_id)) {
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
        // finds the next question to display
        const questionsLen = this.state.questions.length;
        let position = this.state.questions.find(
            question => question.id === this.state.currentQuestionID).position + 1
        let flag = true
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

    /** 
     * @description serves the backend for getting the next question in the question array
     * @param newPosition the position of the new question
     * @returns a new state
    */
    setQuestion = (newPosition) => {
        // Sets the question with the predetermined position as the new current question and gets the questions choices from the API.
        const newQuestion = this.state.questions.find(question => question.position === newPosition)
        const newQuestionID = newQuestion.id
        const questionType = newQuestion.type
        const isReq = newQuestion.required
        // changes the state of the initialState
        this.setState({
            currentQuestionID: newQuestionID,
            currentQuestionType: questionType,
            currentIsRequired: isReq,
        }, async () => {
            if (this.state.currentQuestionType !== STR) {
                const newChoices = await questionService.getChoices(newQuestionID);

                // Sets an empty answer array for multi select question
                if (this.state.currentQuestionType === MULTI_SELECT) {
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
        });
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
                    ...previousState,
                    multiSelectArray: newMultiSelectArray
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
        // checks if the text question is required and shows the required field in that case
        if (('' + text).trim() === '' && this.state.currentIsRequired) {
            this.showFieldRequired()
        } else {
            // otherwise changes the state and saves the text
            await this.setState((previousState) => {
                return {
                    ...previousState,
                    answers: {
                        ...previousState.answers,
                        [previousState.currentQuestionID]: text
                    }
                }
            });
            this.moveToNextQuestion()
        }
    }

    /**
     * @description submits multi answers saved in an array
     * @returns moves to the next questions
     */
    submitMultiAnswer = async () => {
        // If the questions is required it shows the required field
        if (this.state.multiSelectArray.length === 0 && this.state.currentIsRequired) {
            this.showFieldRequired()
        } else {
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
    }


    /**
     * @description simply answers an question and moves to next
     */
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

    /**
     * @description submits the observations and shows the next question 
     */
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


    /**
     * @description checks what type question is and calls the right function for the type
     */
    handleChoiceClick = (choice) => {
        if (this.state.currentQuestionType === SELECT) {
            this.singleAnswerClick(choice)
        } else if (this.state.currentQuestionType === MULTI_SELECT) {
            this.multiAnswerClick(choice)
        }
    }

    /**
     * @description submits the observation to the API and POSTs it
     */
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
        // calls the service.js postObservation to API
        questionService.postObservation(data);

        this.setState({
            answers: {}, // prevents the previous answers from being POSTed
            isAllQuestionsAnswered: true,
        });
        // sets the new state to begin all over
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
                onSubmitMultiClick={this.submitMultiAnswer}
                onSubmitFreeText={this.submitTextAnswer}
                error={this.state.error}
            />
        );
    }
}

export default App;
