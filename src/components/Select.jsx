import React from "react";
import { array, func, object } from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const buttonStyle = (isSelected) => ({
    width: '90%',
    backgroundColor: isSelected ? '#4cb4ff' : '#0496FF',
    minHeight: 100,
    height: '100%',
    borderRadius: 30,
    margin: 'auto',
    overflowWrap: 'break-word',
});

const textStyle = {

    fontSize: 35,
    color: '#ffffff',
    fontWeight: 'bold',
};

class Select extends React.Component {
    handleChoice = (choice) => {

        this.props.addAnswer({
            questionId: this.props.currentQuestion.id,
            answer: {
                id: choice.id,
            },
        });

        const newSelectedChoices = [choice];
        this.props.setSelectedChoices(newSelectedChoices);
        this.props.moveToNextQuestion();

    }

    render() {
        const selectedChoiceIds = this.props.selectedChoices.map(selection => selection.id);

        return this.props.currentChoices.map(choice => {
            const isSelected = selectedChoiceIds.includes(choice.id);
            return (
                <Grid item xs={12} sm={6} xl={3} key={choice.id}>
                    <Button
                        variant={isSelected ? 'contained' : 'text'}
                        style={buttonStyle(isSelected)}
                        onClick={() => this.handleChoice(choice)}
                    >
                        <Typography style={textStyle}>{choice.name}</Typography>
                    </Button>
                </Grid>
            );
        });
    }
}

Select.propTypes = {
    currentQuestion: object.isRequired,
    currentChoices: array.isRequired,
    selectedChoices: array.isRequired,
    moveToNextQuestion: func.isRequired,
    setSelectedChoices: func.isRequired,
    addAnswer: func.isRequired,
};

export default Select;
