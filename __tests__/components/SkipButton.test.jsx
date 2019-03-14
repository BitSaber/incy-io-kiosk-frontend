import React from 'react';
import { mountWithIntl, loadTranslationObject } from 'enzyme-react-intl';
import Button from '@material-ui/core/Button';
import en from '../../src/translations/en';
import SkipButton from '../../src/components/SkipButton';


loadTranslationObject(en);

describe('<SkipButton />', () => {
    it('should render the default text', () => {
        const component = mountWithIntl(<SkipButton onClick={jest.fn()} />);
        expect(component.html()).toContain('Skip');
    });

    it('should call the clickHandler', () => {
        const clickHandler = jest.fn();
        const component = mountWithIntl(<SkipButton onClick={clickHandler} />);
        const button = component.find(Button);
        button.props().onClick();
        expect(clickHandler).toBeCalled();
    });
});
