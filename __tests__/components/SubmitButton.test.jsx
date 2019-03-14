import React from 'react';
import { mountWithIntl, loadTranslationObject } from 'enzyme-react-intl';
import Button from '@material-ui/core/Button';
import fi from '../../src/translations/fi';
import SubmitButton from '../../src/components/SubmitButton';


loadTranslationObject(fi);
describe('<SubmitButton />', () => {

    it('should render the default text from Intl in finnish', () => {
        const component = mountWithIntl(<SubmitButton onClick={jest.fn()} />);
        expect(component.html()).toContain(fi.submitbutton);
    });

    it('should call the clickHandler', () => {
        const clickHandler = jest.fn();
        const component = mountWithIntl(<SubmitButton onClick={clickHandler} />);
        const button = component.find(Button);
        button.props().onClick();
        expect(clickHandler).toBeCalled();
    });
});
