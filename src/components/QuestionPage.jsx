import React from 'react';
import {
    array,
    object,
    arrayOf,
    string,
    func,
    bool,
    number,
    shape,
} from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {
    Typography,
} from '@material-ui/core';
import FreeText from '../containers/FreeText';
import SkipButton from '../components/SkipButton';
import GoBackButton from '../components/GoBackButton';
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
        question: object.isRequired,
        questionChoices: arrayOf(object).isRequired,
        onChoiceClick: func.isRequired,
        questionType: string.isRequired,
        onSubmitFreeText: func.isRequired,
        questionPos: number.isRequired,
        error: shape({
            showError: bool.isRequired,
            messageId: string.isRequired,
        }).isRequired,
        moveToNextQuestion: func.isRequired,
        currentIsRequired: bool.isRequired,
        text: string.isRequired,
        addAnswer: func.isRequired,
        showFieldRequired: func.isRequired,
        selectedChoices: array.isRequired,
        setSelectedChoices: func.isRequired,
        goToPreviousQuestion: func.isRequired,
        shownQuestions: array.isRequired,
    }
    /**
     * @description rendering the button on the screen
     * @returns button with text and submit function
     */
    submitMultiButton = () => {
        const clickHandler = async () => {
            const {
                question,
                selectedChoices,
                addAnswer,
                moveToNextQuestion,
                showFieldRequired,
                setSelectedChoices,
            } = this.props;

            if (question.required && selectedChoices.length === 0) {
                showFieldRequired();
            } else {
                await addAnswer({
                    questionId: question.id,
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
        if (questionType === SELECT) {
            return <Select moveToNextQuestion={this.props.moveToNextQuestion} currentChoices={this.props.questionChoices} />;
        } else if (questionType === MULTI_SELECT) {
            return <MultiSelect currentChoices={this.props.questionChoices} />;
        } else if (questionType === STR) {
            return <FreeText />;
        } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
            return null;
        } else {
            throw new Error(`Invalid Question type '${questionType}'`);
        }
    }

    /**
     * @description a text button for submitting free text from @function renderTextField
     */
    submitTextButton = () => {
        return ( // XXX: does not render for some reason
            <div className="center-align txt">
                <Grid container direction="row" justify="center">
                    <SubmitButton
                        onClick={() => {
                            this.props.onSubmitFreeText(this.props.text); //onClick should dispatch an action
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
        if (this.props.questionPos === 0) {
            return <Language />;
        } else {
            return;
        }
    }

    renderGoBackButton = () => {
        if (this.props.shownQuestions.length) {
            return <GoBackButton onClick={this.props.goToPreviousQuestion}/>;
        }
    }

    renderQuestion = () => {
        return <Typography style={style.textStyle}> {this.props.question.name}</Typography>;
    }

    skipHandler = async () => {
        this.props.moveToNextQuestion();
    }

    renderSkipButton = () => {
        return !this.props.currentIsRequired &&
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
                    {this.renderQuestionElements(this.props.questionType)}
                </Grid>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={16}
                >
                    <Grid item xs={12} md={12} xl={12}>
                        {this.renderSubmitButton(this.props.questionType)}
                    </Grid>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="baseline"
                        spacing={16}
                    >
                        {this.renderGoBackButton()}
                        {this.renderSkipButton()}
                    </Grid>
                    {this.renderLanguageButtons()}
                </Grid>
            </Grid>
        );
    }
}

export default QuestionPage;
