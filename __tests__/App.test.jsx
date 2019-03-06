import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';

describe('<App />', () => {
    it('should set the initial state correctly in constructor.', () => {
        const setQuestions = jest.fn();

        const component = shallow(
            <App
                currentLanguageId="en"
                answers={{}}
                addAnswer={jest.fn()}
                resetAnswers={jest.fn()}
                setQuestions={setQuestions}
                questions={{ allQuestions: [] }}
            />
        );
        expect(component.state().currentQuestionID).toEqual(null);
        expect(component.state().currentQuestionChoices).toEqual([]);
        expect(component.state().isAllQuestionsAnswered).toEqual(false);
    });

    it('should call setQuestions on componentDidMount()', () => {
        const setQuestions = jest.fn();
        shallow(
            <App
                currentLanguageId="en"
                answers={{}}
                addAnswer={jest.fn()}
                resetAnswers={jest.fn()}
                setQuestions={setQuestions}
                questions={{ allQuestions: [] }}
            />
        );
        expect(setQuestions.mock.toBeCalled)
    });
})