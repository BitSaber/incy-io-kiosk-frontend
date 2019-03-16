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
import CircularProgress from '@material-ui/core/CircularProgress';
import FreeText from '../containers/FreeText';
import BigButton from '../components/BigButton';
import SkipButton from '../components/SkipButton';
import SubmitButton from '../components/SubmitButton';
import Language from '../containers/Language';
import MultiSelect from '../containers/MultiSelect';
import {
    FormattedMessage,
} from 'react-intl';

import {
    SELECT,
    MULTI_SELECT,
    STR,
    UNINITIALIZED as QUESTION_TYPE_UNINITIALIZED,
} from '../constants/questionTypes';
import { FINISHED_STATE } from '../constants/loadingStates';

const style = {
    body: {
        maxHeight: '3000px',
        backgroundColor: '#0078CC',
        display: 'block',
        height: '120vh',
    },
    basic: {
        height: '100%',
        alignItems: 'center',
        fontFamily: 'Roboto',
        overflow: 'hidden',
    },
    textStyle: {
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold',
    },
    questionDiv: {
        backgroundColor: '#0496FF',
        display: 'flex',
        height: '10%',
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
        loadingStates: shape({
            questions: string.isRequired,
            choices: string.isRequired,
        }).isRequired,
    }
    /**
     * @description rendering the button on the screen
     * @returns button with text and submit function
     */
    submitMultiButton = () => {
        const clickHandler = () => {
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
                addAnswer({
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
     * @description rendering the selection method
     * @returns button
     */
    renderSelect = () => {
        return this.props.questionChoices.map(questionsChoice => (
            <BigButton
                key={questionsChoice.id}
                onClick={() => this.props.onChoiceClick(questionsChoice)}
                text={questionsChoice.name}
            />
        ));
    }

    renderMultiselect = () => {
        return <MultiSelect />;
    }

    renderTextField = () => {
        return <FreeText />;
    }


    /**
     * @description renders different question elements depending on question type
     */
    renderQuestionElements = (questionType) => {
        if (this.props.loadingStates.questions === FINISHED_STATE &&
            this.props.loadingStates.choices === FINISHED_STATE) {
            if (questionType === SELECT) {
                return this.renderSelect();
            } else if (questionType === MULTI_SELECT) {
                return this.renderMultiselect();
            } else if (questionType === STR) {
                return this.renderTextField();
            } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
                return null;
            } else {
                throw new Error(`Invalid Question type '${questionType}'`);
            }
        } else {
            return;
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
        if (this.props.loadingStates.questions === FINISHED_STATE &&
            this.props.loadingStates.choices === FINISHED_STATE) {
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
        } else {
            return;
        }
    }

    renderLanguageButtons = () => {
        if (this.props.loadingStates.questions === FINISHED_STATE &&
            this.props.loadingStates.choices === FINISHED_STATE) {
            if (this.props.questionPos === 0) {
                return <Language />;
            } else {
                return;
            }
        }
    }

    renderQuestion = () => {
        if (this.props.loadingStates.questions === FINISHED_STATE &&
            this.props.loadingStates.choices === FINISHED_STATE) {
            return <Typography style={style.textStyle}> {this.props.question.name}</Typography>;
        } else {
            return <CircularProgress />; // TODO: style
        }
    }

    renderSkipButton = () => {
        if (this.props.loadingStates.questions === FINISHED_STATE &&
            this.props.loadingStates.choices === FINISHED_STATE) {
            return !this.props.currentIsRequired &&
                <SkipButton
                    onClick={() => this.props.moveToNextQuestion()}
                    text={"Skip"}
                />;
        } else {
            return;
        }
    }

    render() {

        return (
            <div style={style.body}>
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
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                        spacing={24} >

                        <Grid item xs={12} md={12} xl={12}> {
                            this.props.error.showError &&
                            <Typography style={style.error} variant='h4' color='error'>
                                <FormattedMessage id={this.props.error.messageId}
                                    defaultMessage="This field is required!"
                                    description="Requirement text"
                                    values={{ what: 'react-intl' }}
                                />
                            </Typography>
                        }</Grid>
                        {this.renderQuestionElements(this.props.questionType)}
                    </Grid>

                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={16} >
                        <Grid item xs={12} md={12} xl={12}>
                            {this.renderSubmitButton(this.props.questionType)}
                        </Grid>
                        <Grid item xs={12} md={12} xl={12}>
                            {this.renderSkipButton()}
                            {this.renderLanguageButtons()}
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default QuestionPage;
