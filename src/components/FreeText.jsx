import React from 'react';

import { TextField } from '@material-ui/core';
import { string, func, object } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SubmitButton from './SubmitButton';

const style = {
    textDiv: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#0496FF',
        fontWeight: 'bold',
        borderRadius: 30,
        border: 'none',
        paddingLeft: 30,
        paddingRight: 30,
    },
};

export default class FreeText extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: string.isRequired,
        onTextChange: func.isRequired,
        resetText: func.isRequired,
        addAnswer: func.isRequired,
        questions: object.isRequired,
        moveToNextQuestion: func.isRequired,
        showFieldRequired: func.isRequired,
    }

    handleChange = (event) => {
        this.props.onTextChange(event.target.value);
    }

    /**
     * @description submits the text answer to the answers in the initial state
     */
    submitTextAnswer = async () => {
        const { addAnswer, questions, resetText, text } = this.props;
        const { currentQuestion } = questions;

        // checks if the text question is required and shows the required field in that case
        if (('' + text).trim() === '' && currentQuestion.required) {
            this.props.showFieldRequired();
        } else {
            // otherwise changes the state and saves the text
            await addAnswer({
                questionId: currentQuestion.id,
                answer: text,
            });
            await resetText();
            await this.props.moveToNextQuestion();
        }
    }

    render() {
        return (
            <Grid>
                <Grid>
                    <form>
                        <TextField
                            id="bare"
                            multiline
                            rows="10"
                            margin="normal"
                            value={this.props.text}
                            onChange={this.handleChange}
                            InputProps={{ disableUnderline: true, style: { fontSize: 30, color: '#ffffff', hover: '#ffffff' } }}
                            style={style.textDiv}
                        />
                    </form>
                </Grid>
                <SubmitButton onClick={this.submitTextAnswer} text="Submit" />
            </Grid>
        );
    }
}
