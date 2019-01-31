import React from 'react';
//import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types'

import BigButton from '../components/BigButton';
import '../css/style.css';


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
        return <BigButton onClick= {() => this.props.onSubmitMultiClick()} text="Submit" />
    }

    renderChoices = () => {
        return this.props.questionChoices.map(questionsChoice => (
                <BigButton
                    key={questionsChoice.id}
                    onClick={() => this.props.onChoiceClick(questionsChoice)}
                    text={questionsChoice.name}
                />
            )
        )
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    renderTextField = (questionType) => {
        if (questionType === "str") {
            return (
                <div>
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
                                style={{ width: 1000 }}
                            />
                        </form>
                    </div>
                </div>
            )
        }
    }

    renderQuestionElements = (questionType) => {
        //console.log(questionType)
        if (questionType === "select" || questionType === "multi-select") {
            return (
                this.renderChoices()
            )
        } else if (questionType === "str") {
            return (
                this.renderTextField()
            )
        }
    }

    submitTextButton = () => {
        <BigButton
            onClick={() => this.props.onSubmitFreeText(this.state.value)}
            text="Submit"
        />
    }

    renderSubmitButton = (questionType) => {
        if (questionType === "multi-select") {
            return this.submitMultiButton()
        } else if (questionType === "str") {
            return this.submitTextButton()
        }
    }

    render() { //TODO: attributes of class txt should be implemented with material UI
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

                        </Grid>
                        {this.renderSubmitButton(this.props.questionType)}
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
