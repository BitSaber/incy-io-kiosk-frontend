import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

import SkipButton from '../../src/components/SkipButton';

describe('<SkipButton />', () => {
    it('should render the default text', () => {
        const component = shallow(<SkipButton text = 'Skip' onClick={() => {}} />);
        expect(component.html()).toContain('Skip');
    });

    it('should call the clickHandler when clicked', () => {
        const clickHandler = jest.fn();
        const component = shallow(<SkipButton text = 'Skip' onClick={clickHandler} />);
        const button = component.find(Button);
        button.props().onClick();
        expect(clickHandler).toBeCalled();
    });
});
