import React from 'react';
import { string, object, func, bool, shape, array, number } from 'prop-types';
import ProgressBar from '../containers/ProgressBar';
import questionService from '../service';
import ThankYouPage from '../components/ThankYouPage';
import QuestionPage from '../containers/QuestionPage';
import LoadingPage from '../components/LoadingPage';
import {
    SELECT,
    STR,
} from '../constants/questionTypes';
import { FINISHED_STATE } from '../constants/loadingStates';

const style = {
    body: {
        overflow: 'auto',
        backgroundColor: '#0078CC',
        height: '100vh',
        maxHeight: '500vh',
        fontFamily: 'Roboto',
        display: 'flex',
        flexDirection: 'column',
    },
};

class App extends React.Component {

    /**
     * @description sets up the context of the questionnaire,
     * fetches the questions and sets up the first question when the page is first loaded
     */
    async componentDidMount() {
        const { setCategory, setPlace, setQuestions,
            currentLanguageId, getAllChoices } = this.props;
        await setCategory(currentLanguageId);
        await setPlace(currentLanguageId);
        await setQuestions(currentLanguageId);

        await getAllChoices(this.props.questions.allQuestions, currentLanguageId);
        this.setFirstQuestion();
    }

    static propTypes = {
        currentLanguageId: string.isRequired,
        answers: object.isRequired,
        addAnswer: func.isRequired,
        removeAnswer: func.isRequired,
        resetAnswers: func.isRequired,
        questions: shape({
            allQuestions: array.isRequired,
            currentQuestion: object,
            shownQuestions: array.isRequired,
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
        addShownQuestion: func.isRequired,
        removeShownQuestion: func.isRequired,
        resetShownQuestions: func.isRequired,
        context: shape({
            place: shape({
                id: number.isRequired,
            }).isRequired,
            category: shape({
                id: number.isRequired,
            }).isRequired,
        }),
        setCategory: func.isRequired,
        setPlace: func.isRequired,
        getAllChoices: func.isRequired,
        choices: object.isRequired,
        resetText: func.isRequired,
        loadingStates: shape({
            questions: string.isRequired,
            choices: string.isRequired,
            context: shape({
                category: string.isRequired,
                place: string.isRequired,
            }).isRequired,
        }).isRequired,
        progressUpdate: func.isRequired,
    }

    setFirstQuestion = async () => {
        const { setCurrentQuestion } = this.props;
        const { allQuestions } = this.props.questions;

        if (allQuestions.length > 0) {
            const currentQuestion = allQuestions[0];
            setCurrentQuestion(currentQuestion);
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
     * @description Moves the questionnaire to the next question, or submits
     * the answers if no more questions to be answered.
     */
    moveToNextQuestion = async () => {
        this.props.addShownQuestion(this.props.questions.currentQuestion);
        const {
            questions,
            setCurrentQuestion,
            resetText,
            progressUpdate,
            answers,
        } = this.props;
        const { allQuestions, currentQuestion } = questions;

        // Adds the question to shown questions array

        if (currentQuestion.type === STR) {
            resetText();
        }

        // IDs of both answered and skipped questions
        const answeredQuestionIds = Object.keys(answers.answers)
            .map(answer => Number(answer)).concat(answers.skippedQuestionIds);

        const answeredChoiceIds = Object.values(answers.answers).map(object => {
            if (Array.isArray(object)) {
                return object.map(x => x.id);
            }
            else {
                return object.id;
            }
        }).flat();

        const unansweredQuestions = allQuestions.filter(question => !answeredQuestionIds.includes(question.id));

        // iterates all unanswered questions and returns the next question to show
        const nextQuestion = unansweredQuestions.reduce((prevResult, question) => {
            if (prevResult) {
                return prevResult;
            }
            if (question.depends_on_choice_id === null) {
                return question;
            }
            if (answeredChoiceIds.includes(question.depends_on_choice_id)) {
                return question;
            }
        }, null);

        if (nextQuestion) {
            setCurrentQuestion(nextQuestion);
            progressUpdate(answeredQuestionIds.length / allQuestions.length * 100);
        } else {
            this.submitObservation();
        }
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
        const { answers, resetAnswers, setAllAnswered, context, progressUpdate, resetShownQuestions } = this.props;

        const time = new Date().toString().substring(0, 21);
        const data = {
            occurred_at: time,
            place: context.place.id,
            deadline: null,
            category: context.category.id,
            answers: answers.answers,
        };
        // calls the service.js postObservation to API
        questionService.postObservation(data);
        resetAnswers();
        resetShownQuestions();

        setAllAnswered(true);
        this.setFirstQuestion();
        progressUpdate(100);

        setTimeout(() => {
            setAllAnswered(false);
            progressUpdate(0);
        }, 3000);
    }

    isDoneLoading = () => {
        const { questions, choices, context } = this.props.loadingStates;
        return questions === FINISHED_STATE && choices === FINISHED_STATE &&
            context.category === FINISHED_STATE && context.place === FINISHED_STATE;
    }

    goToPreviousQuestion = () => {
        const { questions, removeAnswer, removeShownQuestion, setCurrentQuestion, progressUpdate } = this.props;
        const { shownQuestions, allQuestions } = questions;

        const previousQuestionId = shownQuestions[shownQuestions.length - 1];
        const previousQuestion = allQuestions.find(question => question.id === previousQuestionId);
        removeAnswer(previousQuestionId);
        progressUpdate((shownQuestions.length - 1) / allQuestions.length * 100);
        setCurrentQuestion(previousQuestion);
        removeShownQuestion(previousQuestion);
    }

    render() {
        const { allQuestions, currentQuestion } = this.props.questions;
        const { questionChoices } = this.props.choices;

        if (!this.isDoneLoading() || !currentQuestion || !questionChoices) {
            return <LoadingPage />;
        }

        const currentChoices = questionChoices.find(choice => choice.questionId === currentQuestion.id);

        return (
            <div style={style.body}>
                <ProgressBar />
                {this.props.flags.isAllQuestionsAnswered ? (<ThankYouPage />) :
                    (<QuestionPage
                        question={currentQuestion}
                        questionChoices={currentChoices.questionChoices}
                        onChoiceClick={this.handleChoiceClick}
                        questionType={currentQuestion.type}
                        onSubmitFreeText={this.submitTextAnswer}
                        questionPos={allQuestions.findIndex(question => question.id === currentQuestion.id)}
                        error={this.props.flags.error}
                        currentIsRequired={currentQuestion.required}
                        moveToNextQuestion={this.moveToNextQuestion}
                        showFieldRequired={this.showFieldRequired}
                        goToPreviousQuestion={this.goToPreviousQuestion}
                        shownQuestions={this.props.questions.shownQuestions}
                    />)}
            </div>
        );
    }
}

export default App;
