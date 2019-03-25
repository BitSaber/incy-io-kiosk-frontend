import React from 'react';
import {
    array,
    object,
    arrayOf,
    string,
    func,
    bool,
    shape,
} from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {
    Typography,
} from '@material-ui/core';
import FreeText from '../containers/FreeText';
import SkipButton from '../components/SkipButton';
import SubmitButton from '../components/SubmitButton';
import Language from '../containers/Language';
import MultiSelect from '../containers/MultiSelect';
import Select from '../containers/Select';
import { FormattedMessage } from 'react-intl';

import {
    SELECT,
    MULTI_SELECT,
    STR,
    UNINITIALIZED as QUESTION_TYPE_UNINITIALIZED,
} from '../constants/questionTypes';

const style = {
    body: {

    },
    basic: {
        flex: '1',
        alignItems: 'center',
        padding: '8px',
    },
    textStyle: {
        color: '#ffffff',
        fontSize: 36,
        fontWeight: 'bold',
    },
    questionDiv: {
        backgroundColor: '#0496FF',
        display: 'flex',
        minHeight: '12%',
    },
    error: {
        fontWeight: 'bold',
    },

};

class QuestionPage extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        currentQuestion: object.isRequired,
        questionChoices: arrayOf(object).isRequired,
        error: shape({
            showError: bool.isRequired,
            messageId: string.isRequired,
        }).isRequired,
        moveToNextQuestion: func.isRequired,
        text: string.isRequired,
        addAnswer: func.isRequired,
        skipAnswer: func.isRequired,
        showFieldRequired: func.isRequired,
        selectedChoices: array.isRequired,
        setSelectedChoices: func.isRequired,
        resetText: func.isRequired,
        questions: shape({
            allQuestions: array.isRequired,
            currentQuestion: object,
        }).isRequired,
    }
    /**
     * @description rendering the button on the screen
     * @returns button with text and submit function
     */
    submitMultiButton = () => {
        const clickHandler = async () => {
            const {
                currentQuestion,
                selectedChoices,
                addAnswer,
                moveToNextQuestion,
                showFieldRequired,
                setSelectedChoices,
            } = this.props;

            if (currentQuestion.required && selectedChoices.length === 0) {
                showFieldRequired();
            } else {
                await addAnswer({
                    questionId: currentQuestion.id,
                    answer: selectedChoices,
                });
                setSelectedChoices([]);
                moveToNextQuestion();
            }
        };
        return <SubmitButton onClick={clickHandler} />;
    }

    /**
     * @description renders different question elements depending on question type
     */
    renderQuestionElements = (questionType) => {
        const { questionChoices, currentQuestion } = this.props;
        const currentChoices = questionChoices.find(choice => choice.questionId === currentQuestion.id).questionChoices;
        if (questionType === SELECT) {
            return <Select moveToNextQuestion={this.props.moveToNextQuestion} currentChoices={currentChoices} />;
        } else if (questionType === MULTI_SELECT) {
            return <MultiSelect currentChoices={currentChoices} />;
        } else if (questionType === STR) {
            return <FreeText />;
        } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
            return null;
        } else {
            throw new Error(`Invalid Question type '${questionType}'`);
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
            this.props.moveToNextQuestion();
        }
    }

    /**
     * @description a text button for submitting free text from @function renderTextField
     */
    submitTextButton = () => {
        return (
            <div className="center-align txt">
                <Grid container direction="row" justify="center">
                    <SubmitButton
                        onClick={() => {
                            this.submitTextAnswer(this.props.text);
                        }}
                        text="Submit"
                    />
                </Grid>
            </div>
        );
    }

    questionHasSubmitButton = (questionType) => {
        const questionsWithSubmitButtons = [
            MULTI_SELECT,
            STR,
        ];
        return questionsWithSubmitButtons.indexOf(questionType) !== -1;
    }
    /**
     * @description renders different submit button depending on the question type
     */
    renderSubmitButton = (questionType) => {
        if (!this.questionHasSubmitButton(questionType)) {
            return null;
        } else if (questionType === MULTI_SELECT) {
            return this.submitMultiButton();
        } else if (questionType === STR) {
            return this.submitTextButton();
        } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
            return (<div>Loading, please wait...</div>);
        } else {
            throw new Error(`Invalid Question type '${questionType}'`);
        }
    }

    renderLanguageButtons = () => {
        const { currentQuestion, questions: { allQuestions } } = this.props;
        const questionPosition = allQuestions.findIndex(question => question.id === currentQuestion.id);
        if (questionPosition === 0) {
            return <Language />;
        } else {
            return;
        }
    }

    renderQuestion = () => {
        return <Typography style={style.textStyle}> {this.props.currentQuestion.name}</Typography>;
    }

    skipHandler = async () => {
        await this.props.skipAnswer(this.props.currentQuestion.id);
        this.props.moveToNextQuestion();
    }

    renderSkipButton = () => {
        return !this.props.currentQuestion.required &&
            <SkipButton
                onClick={this.skipHandler}
                text={"Skip"}
            />;
    }

    renderError = () => {
        return this.props.error.showError &&
            <Typography style={style.error} variant='h4' color='error'>
                <FormattedMessage id={this.props.error.messageId}
                    defaultMessage="This field is required!"
                    description="Requirement text"
                    values={{ what: 'react-intl' }}
                />
            </Typography>;
    }

    render() {

        return (
            <Grid container style={style.basic}>
                <Grid
                    id="question-test-id"
                    container
                    justify="center"
                    alignItems="center"
                    style={style.questionDiv}
                >
                    {this.renderQuestion()}
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                    spacing={16}
                >

                    <Grid item xs={12} md={12} xl={12}>
                        {this.renderError()}
                    </Grid>
                    {this.renderQuestionElements(this.props.currentQuestion.type)}
                </Grid>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={16}
                >
                    <Grid item xs={12} md={12} xl={12}>
                        {this.renderSubmitButton(this.props.currentQuestion.type)}
                    </Grid>
                    <Grid item xs={12} md={12} xl={12}>
                        {this.renderSkipButton()}
                        {this.renderLanguageButtons()}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default QuestionPage;
