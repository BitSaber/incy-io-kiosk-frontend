import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../src/App';

describe('<App />', () => {
    it('should set the initial state correctly in constructor.', () => {
        const newApp = shallow(<App currentLanguageId="en" answers={{}} addAnswer={jest.fn()} resetAnswers={jest.fn()} />);
        expect(newApp.state().questions).toEqual([]);
        expect(newApp.state().currentQuestionID).toEqual(null);
        expect(newApp.state().currentQuestionChoices).toEqual([]);
        expect(newApp.state().isAllQuestionsAnswered).toEqual(false);
    })
})