import flagsReducer from '../../src/reducers/flagsReducer';
import { setAllAnsweredAction, setAllDisplayedAction, 
    setShowErrorAction, setErrorMsgAction } from '../../src/actions/flagActions';

describe('flagsReducer', () => {
    it('should set the initial state', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        expect(state).toEqual({
            isAllQuestionsAnswered: false,
            isAllQuestionsDisplayed: false,
            error: {
                showError: false,
                message: "",
            }
        });
    })

    it('should change isAllQuestionsAnswered to true', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        const nextState = flagsReducer(state, setAllAnsweredAction(true));
        expect(nextState).toEqual({
            isAllQuestionsAnswered: true,
            isAllQuestionsDisplayed: false,
            error: {
                showError: false,
                message: "",
            }
        });
    })

    it('should change isAllQuestionsDisplayed to true', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        const nextState = flagsReducer(state, setAllDisplayedAction(true));
        expect(nextState).toEqual({
            isAllQuestionsAnswered: false,
            isAllQuestionsDisplayed: true,
            error: {
                showError: false,
                message: "",
            }
        });
    })

    it('should change showError to true', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        const nextState = flagsReducer(state, setShowErrorAction(true));
        expect(nextState).toEqual({
            isAllQuestionsAnswered: false,
            isAllQuestionsDisplayed: false,
            error: {
                showError: true,
                message: "",
            }
        });
    })

    it('should change error.message to `test`', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        const nextState = flagsReducer(state, setErrorMsgAction("test"));
        expect(nextState).toEqual({
            isAllQuestionsAnswered: false,
            isAllQuestionsDisplayed: false,
            error: {
                showError: false,
                message: "test",
            }
        });
    })
})