import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'
import BigButton from '../components/BigButton';
import SkipButton from '../components/SkipButton';
import SubmitButton from '../components/SubmitButton'
import Language from '../containers/Language';
import ToggleButtons from '../components/ToggleButtons';
import { FormattedMessage } from 'react-intl';

import {
    SELECT,
    MULTI_SELECT,
    STR,
    UNINITIALIZED as QUESTION_TYPE_UNINITIALIZED
} from '../constants/questionTypes';


// #0078CC
// #2B4141
const style = {
    body: {
        maxHeight: '3000px',
        backgroundColor: '#0078CC',
        display: 'block',
        height: '120vh'
    },
    basic: {
        height: '100%',
        alignItems: 'center',
        fontFamily: 'Roboto',
        overflow: 'hidden'
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
    textDiv: {
        width: 500,
        backgroundColor: '#ffffff',
        fontWeight: 'bold',
        borderRadius: 30,
        border: 'none'
    },
    error: {
        fontWeight: 'bold',
    }

}

class QuestionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '' // current text of the textField
        };
    }

    static propTypes = {
        question: PropTypes.object.isRequired,
        questionChoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChoiceClick: PropTypes.func.isRequired,
        questionType: PropTypes.string.isRequired,
        onSubmitMultiClick: PropTypes.func.isRequired,
        onSubmitFreeText: PropTypes.func.isRequired,
        questionPos: PropTypes.number.isRequired,
        error: PropTypes.bool,
        skipClick: PropTypes.func.isRequired,
        currentIsRequired: PropTypes.bool.isRequired
    }

    submitMultiButton = () => {
        return <SubmitButton onClick={() => this.props.onSubmitMultiClick()} />
    }

    renderSelect = () => {
        return this.props.questionChoices.map(questionsChoice => (
            <BigButton
                key={questionsChoice.id}
                onClick={() => this.props.onChoiceClick(questionsChoice)}
                text={questionsChoice.name}
            />
        ))
    }

    renderMultiselect = () => {
        return this.props.questionChoices.map(choice => (
            <ToggleButtons key={choice.id} choice={choice} onChoiceClick={this.props.onChoiceClick} />
        ))
    }

    //Updates changes made into textfield into state
    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    renderTextField = () => {
        const label = (<FormattedMessage id="textfield.placeholder"
            defaultMessage="Your answer"
            description="Placeholder on text field"
            values={{ what: 'react-intl' }}
        />);

        return (
            <div className="center-align txt">
                <form>
                    <TextField
                        id="bare"
                        label={label}
                        multiline
                        rows="20"
                        margin="normal"
                        value={this.state.text}
                        onChange={this.handleChange}
                        InputProps={{ disableUnderline: true }}
                        style={style.textDiv}
                    />
                </form>
            </div>
        )
    }

    renderQuestionElements = (questionType) => {
        if (questionType === SELECT) {
            return this.renderSelect()
        } else if (questionType === MULTI_SELECT) {
            return this.renderMultiselect()
        } else if (questionType === STR) {
            return this.renderTextField()
        } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
            return null;
        } else {
            throw `Invalid Question type '${questionType}'`
        }
    }

    submitTextButton = () => {
        return ( // XXX: does not render for some reason
            <SubmitButton
                onClick={() => {
                    this.props.onSubmitFreeText(this.state.text)
                    this.setState({
                        text: ''
                    });
                }}
                text="Submit"
            />
        )
    }

    questionHasSubmitButton = (questionType) => {
        const questionsWithSubmitButtons = [
            MULTI_SELECT,
            STR,
        ]
        return questionsWithSubmitButtons.indexOf(questionType) !== -1;
    }

    renderSubmitButton = (questionType) => {
        if (!this.questionHasSubmitButton(questionType)) {
            return null
        } else if (questionType === MULTI_SELECT) {
            return this.submitMultiButton()
        } else if (questionType === STR) {
            return this.submitTextButton()
        } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
            return (<div>Loading, please wait...</div>)
        } else {
            throw `Invalid Question type '${questionType}'`
        }
    }

    renderLanguageButtons = () => {
        if (this.props.questionPos === 0) {
            return <Language />
        }
        return
    }


    render() {

        return (
            <div style={style.body}>
                <Grid container style={style.basic}>

                    <Grid container
                        justify="center"
                        alignItems="center"
                        style={style.questionDiv}>
                        <Typography style={style.textStyle}> {this.props.question.name}</Typography>

                    </Grid>

                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                        spacing={24} >

                        <Grid item xs={12} md={12} xl={12}>{this.props.error && <Typography style={style.error} variant='h4' color='error'>
                            <FormattedMessage id="questionpage.required"
                                defaultMessage="This field is required!"
                                description="Requirement text"
                                values={{ what: 'react-intl' }}
                            />
                        </Typography>}</Grid>
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
                            {
                                !this.props.currentIsRequired &&
                                <SkipButton
                                    onClick={() => this.props.skipClick()}
                                    text={"Skip"}
                                />
                            }
                            {this.renderLanguageButtons()}
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default QuestionPage;
