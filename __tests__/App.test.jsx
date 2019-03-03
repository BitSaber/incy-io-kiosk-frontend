import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';

describe('<App />', () => {
    it('should set the initial state correctly in constructor.', () => {
        const getQuestions = jest.fn();

        const component = shallow(
            <App
                currentLanguageId="en"
                answers={{}}
                addAnswer={jest.fn()}
                resetAnswers={jest.fn()}
                getQuestions={getQuestions}
                questions={{ allQuestions: [] }}
            />
        );
        expect(component.state().currentQuestionID).toEqual(null);
        expect(component.state().currentQuestionChoices).toEqual([]);
        expect(component.state().isAllQuestionsAnswered).toEqual(false);
    });

    it('should call getQuestions on componentDidMount()', () => {
        const getQuestions = jest.fn();
        shallow(
            <App
                currentLanguageId="en"
                answers={{}}
                addAnswer={jest.fn()}
                resetAnswers={jest.fn()}
                getQuestions={getQuestions}
                questions={{ allQuestions: [] }}
            />
        );
        expect(getQuestions.mock.toBeCalled)
    });
})