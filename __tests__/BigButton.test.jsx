import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

import BigButton from '../src/components/BigButton';
import { TextContainer } from '../src/components/BigButton';

describe('<BigButton />', () => {
    it('should render the given text', () => {
        const component = shallow(<BigButton text="Hello" onClick={() => {}} />);
        const textContainer = component.find(TextContainer);
        expect(textContainer.text()).toBe('Hello');
    });

    it('should call the clickHandler when clicked', () => {
        const clickHandler = jest.fn();
        const component = shallow(<BigButton text="Hello" onClick={clickHandler} />);
        const button = component.find(Button);
        button.props().onClick();
        expect(clickHandler).toBeCalled();
    });
});
