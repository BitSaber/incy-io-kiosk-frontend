import React from 'react';
import { shallow } from 'enzyme';
import MultiSelect from '../../src/components/MultiSelect';
import { Button } from '@material-ui/core';

describe('<MultiSelect />', () => {
    it('should render all the choices', () => {
        const component = shallow(
            <MultiSelect
                availableChoices={[{ id: 1 }, { id: 2 }]}
                selectedChoices={[]}
                setSelectedChoices={jest.fn()}
            />
        );

        expect(component.children().length).toBe(2);
    });

    it('should select a choice', () => {
        const mockSetSelectedChoices = jest.fn()

        const component = shallow(
            <MultiSelect
                availableChoices={[{ id: 1 }, { id: 2 }]}
                selectedChoices={[]}
                setSelectedChoices={mockSetSelectedChoices}
            />
        );

        const firstButton = component.find(Button).first();
        firstButton.props().onClick();
        expect(mockSetSelectedChoices.mock.calls[0][0]).toEqual([{ id: 1 }]);
    })

    it('should unselect a choice', () => {
        const mockSetSelectedChoices = jest.fn()

        const component = shallow(
            <MultiSelect
                availableChoices={[{ id: 1 }, { id: 2 }]}
                selectedChoices={[{ id: 1 }]}
                setSelectedChoices={mockSetSelectedChoices}
            />
        );

        const firstButton = component.find(Button).first();
        firstButton.props().onClick();
        expect(mockSetSelectedChoices.mock.calls[0][0]).toEqual([]);
    })
});