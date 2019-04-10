import React from 'react';
import { shallow } from 'enzyme';

import Select from '../../src/components/Select';
import { Button } from '@material-ui/core';

describe('<Select />', () => {
    it('should render the selections', () => {
        const currentChoices = [
            { position: 1, id: 1, name: "Yes" },
            { position: 2, id: 2, name: "No" },
        ];
        const currentQuestion = {};
        const mockAddAnswer = jest.fn();
        const mockMoveToNextQuestion = jest.fn();
        const component = shallow(
            <Select
                currentChoices={currentChoices}
                currentQuestion={currentQuestion}
                addAnswer={mockAddAnswer}
                moveToNextQuestion={mockMoveToNextQuestion}
                setSelectedChoices={jest.fn()}
                selectedChoices={[]}
            />
        );

        const buttons = component.find(Button);
        expect(buttons.length).toBe(2);
    });

    it('should add an answer and move to the next question', async () => {
        const currentChoices = [
            { position: 1, id: 1, name: "Yes" },
            { position: 2, id: 2, name: "No" },
        ];
        const currentQuestion = {
            id: 1234,
        };
        const mockAddAnswer = jest.fn();
        const mockMoveToNextQuestion = jest.fn();
        const component = shallow(
            <Select
                currentChoices={currentChoices}
                currentQuestion={currentQuestion}
                addAnswer={mockAddAnswer}
                moveToNextQuestion={mockMoveToNextQuestion}
                setSelectedChoices={jest.fn()}
                selectedChoices={[]}
            />
        );

        const firstChoiceBtn = component.first().children();
        await firstChoiceBtn.props().onClick();

        expect(mockAddAnswer).toHaveBeenCalledTimes(1);
        expect(mockAddAnswer.mock.calls[0][0]).toEqual({
            answer: { id: 1 },
            questionId: 1234,
        });

        expect(mockMoveToNextQuestion).toHaveBeenCalledTimes(1);
    });
});
