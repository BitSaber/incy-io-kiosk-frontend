import React from 'react';
import { mountWithIntl, loadTranslationObject } from 'enzyme-react-intl';
import Button from '@material-ui/core/Button';
import fi from '../../src/translations/fi';
import SkipButton from '../../src/components/SkipButton';


loadTranslationObject(fi);
describe('<SkipButton />', () => {

    it('should render the default text from Intl in finnish', () => {
        const component = mountWithIntl(<SkipButton onClick={jest.fn()} />);
        expect(component.html()).toContain(fi.skipbutton);
    });

    it('should call the clickHandler', () => {
        const clickHandler = jest.fn();
        const component = mountWithIntl(<SkipButton onClick={clickHandler} />);
        const button = component.find(Button);
        button.props().onClick();
        expect(clickHandler).toBeCalled();
    });
});
