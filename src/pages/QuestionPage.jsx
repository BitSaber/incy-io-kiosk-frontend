import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types'
import BigButton from '../components/BigButton';
import '../css/style.css';
import ToggleButtons from '../components/ToggleButtons';

import {
    SELECT,
    MULTI_SELECT,
    STR,
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
        onSubmitFreeText: PropTypes.func.isRequired
    }

    submitMultiButton = () => {
        return <BigButton onClick={() => this.props.onSubmitMultiClick()} text="Submit" />
    }

    renderSelect = () => {
        return this.props.questionChoices.map(questionsChoice => (
            <BigButton
                key={questionsChoice.id}
                onClick={() => this.props.onChoiceClick(questionsChoice)}
                text={questionsChoice.name}
            />
        )
        )
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
        }
    }

    submitTextButton = () => {
        return ( // does not render for some reason
            <div className="center-align txt">
                <Grid container direction="row" justify="center">
                    <BigButton
                        onClick={() => this.props.onSubmitFreeText(this.state.text)}
                        text="Submit"
                    />
                </Grid>
            </div>
        )
    }

    renderSubmitButton = (questionType) => {
        if (questionType === MULTI_SELECT) {
            return this.submitMultiButton()
        } else if (questionType === STR) {
            return this.submitTextButton()
        }
    }

    render() {

        return (
            <div>
                <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img> </div>
                <div className="question-div ">
                    <h2 className="txt" variant="h2">{this.props.question.name}</h2>
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
                        <p>Copyright © 2018 BitSaber, Otaniemi, Finland</p>
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
