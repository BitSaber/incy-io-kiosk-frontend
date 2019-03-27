import React from 'react';
import { shallow } from 'enzyme';
import MultiSelect from '../../src/components/MultiSelect';
import { Button } from '@material-ui/core';

describe('<MultiSelect />', () => {
    it('should render all the choices', () => {
        const component = shallow(
            <MultiSelect
                currentChoices={[{ id: 1 }, { id: 2 }]}
                selectedChoices={[]}
                setSelectedChoices={jest.fn()}
                moveToNextQuestion={jest.fn()}
                showFieldRequired={jest.fn()}
                currentQuestion={{}}
                addAnswer={jest.fn()}
            />
        );

        expect(component.children().length).toBe(2);
    });

    it('should select a choice', () => {
        const mockSetSelectedChoices = jest.fn();

        const component = shallow(
            <MultiSelect
                currentChoices={[{ id: 1 }, { id: 2 }]}
                selectedChoices={[]}
                setSelectedChoices={mockSetSelectedChoices}
                moveToNextQuestion={jest.fn()}
                showFieldRequired={jest.fn()}
                currentQuestion={{}}
                addAnswer={jest.fn()}
            />
        );

        const firstButton = component.find(Button).first();
        firstButton.props().onClick();
        expect(mockSetSelectedChoices).toHaveBeenCalledWith([{ id: 1 }]);
    });

    it('should unselect a choice', () => {
        const mockSetSelectedChoices = jest.fn();

        const component = shallow(
            <MultiSelect
                currentChoices={[{ id: 1 }, { id: 2 }]}
                selectedChoices={[{ id: 1 }]}
                setSelectedChoices={mockSetSelectedChoices}
                moveToNextQuestion={jest.fn()}
                showFieldRequired={jest.fn()}
                currentQuestion={{}}
                addAnswer={jest.fn()}
            />
        );

        const firstButton = component.find(Button).first();
        firstButton.props().onClick();
        expect(mockSetSelectedChoices).toHaveBeenCalledWith([]);
    });

    it('should submit the answer and move to next question', async () => {
        const mockSetSelectedChoices = jest.fn();
        const mockAddAnswers = jest.fn();
        const mockMoveToNextQuestion = jest.fn();

        const component = shallow(
            <MultiSelect
                currentChoices={[{ id: 1 }, { id: 2 }]}
                selectedChoices={[{ id: 1 }]}
                setSelectedChoices={mockSetSelectedChoices}
                moveToNextQuestion={mockMoveToNextQuestion}
                showFieldRequired={jest.fn()}
                currentQuestion={{ id: 1 }}
                addAnswer={mockAddAnswers}
            />
        );

        const submitButton = component.find('SubmitButton');

        await submitButton.props().onClick();

        expect(mockAddAnswers).toHaveBeenCalledWith({ answer: [{ id: 1 }], questionId: 1 });
        expect(mockMoveToNextQuestion).toHaveBeenCalled();

    });
});
