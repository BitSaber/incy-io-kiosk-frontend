import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'
import BigButton from '../components/BigButton';
import '../css/style.css';
import ToggleButtons from '../components/ToggleButtons';

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
        questionType: PropTypes.string.isRequired,
        onSubmitMultiClick: PropTypes.func.isRequired,
        onSubmitFreeText: PropTypes.func.isRequired,
        error: PropTypes.string,
    }
    /**
     * @description rendering the button on the screen
     * @returns button with text and submit function
     */
    submitMultiButton = () => {
        return <BigButton onClick={() => this.props.onSubmitMultiClick()} text="Submit" />
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
        ))
    }
    /**
     * @description renders a toggle button for multiselect questions
     * @returns togglebutton with function
     */
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

    /**
     * @description renders a textfield 
     */
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


    /**
     * @description renders different question elements depending on question type
     */
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

    /**
     * @description a text button for submitting free text from @function renderTextField
     */
    submitTextButton = () => {
        return ( // XXX: does not render for some reason
            <div className="center-align txt">
                <Grid container direction="row" justify="center">
                    <BigButton
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
    /**
     * @description renders different submit button depending on the question type
     */
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

    render() {

        return (
            <div>
                <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img> </div>
                <div className="question-div ">
                    <h2 className="txt" variant="h2">{this.props.question.name}</h2>
                    {this.props.error && <Typography variant='h4' color='error'>{this.props.error}</Typography>}
                </div>
                <div>
                    <div className="center-align txt">
                        <Grid container direction="row" justify="center">

                            {this.renderQuestionElements(this.props.questionType)}
                            {this.renderSubmitButton(this.props.questionType)}

                        </Grid>
                    </div>
                </div>
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
