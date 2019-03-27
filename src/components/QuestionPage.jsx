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
     * @description renders different question elements depending on question type
     */
    renderQuestionElements = () => {
        const { questionChoices, currentQuestion } = this.props;
        const questionType = currentQuestion.type;
        const currentChoices = questionChoices.find(choice => choice.questionId === currentQuestion.id).questionChoices;
        if (questionType === SELECT) {
            return <Select moveToNextQuestion={this.props.moveToNextQuestion} currentChoices={currentChoices} />;
        } else if (questionType === MULTI_SELECT) {
            return <MultiSelect currentChoices={currentChoices} moveToNextQuestion={this.props.moveToNextQuestion} showFieldRequired={this.props.showFieldRequired} />;
        } else if (questionType === STR) {
            return <FreeText moveToNextQuestion={this.props.moveToNextQuestion} showFieldRequired={this.props.showFieldRequired} />;
        } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
            return null;
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
                    <Typography style={style.textStyle}>{this.props.currentQuestion.name}</Typography>
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
                    {this.renderQuestionElements()}
                </Grid>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={16}
                >
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
