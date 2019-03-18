import React from 'react';
import { object, array, func } from 'prop-types';

import BigButton from './BigButton';

const handleChoiceClick = async (choice, currentQuestion, addAnswer, moveToNextQuestion) => {
    await addAnswer({
        questionId: currentQuestion.id,
        answer: {
            id: choice.id,
        },
    });
    moveToNextQuestion();
};

const Select = ({ currentChoices, currentQuestion, addAnswer, moveToNextQuestion }) => {
    return currentChoices.map(choice => (
        <BigButton
            key={choice.id}
            onClick={() => handleChoiceClick(choice, currentQuestion, addAnswer, moveToNextQuestion)}
            text={choice.name}
        />
    ));
};

Select.propTypes = {
    currentChoices: array.isRequired,
    currentQuestion: object.isRequired,
    addAnswer: func.isRequired,
    moveToNextQuestion: func.isRequired,
};

export default Select;
