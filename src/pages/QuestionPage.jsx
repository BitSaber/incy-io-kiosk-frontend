import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'
import BigButton from '../components/BigButton';
import SkipButton from '../components/SkipButton';
import SubmitButton from '../components/SubmitButton'
import '../css/style.css';
import Language from '../components/Language';
import ToggleButtons from '../components/ToggleButtons';
import { FormattedMessage } from 'react-intl';

import {
    SELECT,
    MULTI_SELECT,
    STR,
    UNINITIALIZED as QUESTION_TYPE_UNINITIALIZED
} from '../constants/questionTypes';

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
        languages: PropTypes.array.isRequired,
        onLangClick: PropTypes.func.isRequired,
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
        return (
            <div className="center-align txt">
                <form>
                    <TextField
                        id="outlined-bare"
                        label="Please add text here"
                        multiline
                        rows="20"
                        margin="normal"
                        value={this.state.text}
                        onChange={this.handleChange}
                        variant="outlined"
                        style={{ width: 500 }}
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
            <div className="center-align txt">
                <Grid container direction="row" justify="center">
                    <SubmitButton
                        onClick={() => {
                            this.props.onSubmitFreeText(this.state.text)
                            this.setState({
                                text: ''
                            });
                        }}
                        text="Submit"
                    />
                </Grid>
            </div>
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
            return <Language languages={this.props.languages} onLangClick={this.props.onLangClick} />
        }
        return
    }

    render() {

        return (
            <div>
                <div className="question-div">
                    <h2 className="txt" variant="h2">{this.props.question.name}</h2>
                    {this.props.error && <Typography variant='h4' color='error'>
                        <FormattedMessage id="questionpage.required"
                            defaultMessage="This field is required!"
                            description="Requirement text"
                            values={{ what: 'react-intl' }}
                        />
                    </Typography>}
                </div>
                <div>
                    <div className="center-align txt">
                        <Grid container direction="row" justify="center">

                            {this.renderQuestionElements(this.props.questionType)}
                            {this.renderSubmitButton(this.props.questionType)}

                        </Grid>
                    </div>
                    <div className="skipped">
                        { // TODO: button location and style
                            !this.props.currentIsRequired &&
                            <SkipButton
                                onClick={() => this.props.skipClick()}
                                text={"Skip"}
                            />
                        }
                    </div>

                </div>
                {this.renderLanguageButtons()}
                <footer className="footer">
                    <footer className="inside">
                        <div>Copyright © 2018 BitSaber, Otaniemi, Finland</div>
                        <div className="under">
                            <ul>
                                <li> <a href="https://github.com/BitSaber/incy-io-kiosk-frontend" target="_blank" rel="noopener noreferrer">GitHub</a> </li>
                            </ul>
                        </div>
                    </footer>
                </footer>

            </div>


        )
    }
}

export default QuestionPage;
