import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';

describe('<App />', () => {
    it('should call setQuestions on componentDidMount()', () => {
        const setQuestions = jest.fn();
        shallow(
            <App
                currentLanguageId="en"
                answers={{}}
                addAnswer={jest.fn()}
                resetAnswers={jest.fn()}
                setQuestions={setQuestions}
                setCurrentQuestion={jest.fn()}
                setCurrentChoices={jest.fn()}
                questions={{ allQuestions: [] }}
                setAllAnswered={jest.fn()}
                setAllDisplayed={jest.fn()}
                flags={{ isAllQuestionsAnswered: false, isAllQuestionsDisplayed: false }}
                choices={{ currentChoices: [] }}
            />
        );
        expect(setQuestions.mock.toBeCalled)
    });
})