import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';

// we mock the service so that we can return custom data
jest.mock("../src/service", () => {
    const mockQuestions = [
        {
            position: 2,
        },
        {
            position: 3,
        },
        {
            position: 4,
        },
        {
            position: 1,
        }
    ];
    const mockGetQuestions = jest.fn();
    mockGetQuestions.mockReturnValue(mockQuestions);
    return {
        getQuestions: mockGetQuestions
    };
});

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
                setCurrentQuestion={jest.fn()}
                setCurrentChoices={jest.fn()}
                questions={{ allQuestions: [] }}
                context={{ place: [], category: [] }}
                setPlace={jest.fn()}
                setCategory={jest.fn()}
                choices={{ currentChoices: [] }}
            />
        );
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
                setCurrentQuestion={jest.fn()}
                setCurrentChoices={jest.fn()}
                questions={{ allQuestions: [] }}
                context={{ place: [], category: [] }}
                setPlace={jest.fn()}
                setCategory={jest.fn()}
                choices={{ currentChoices: [] }}
            />
        );
        expect(setQuestions.mock.toBeCalled)
    });
})