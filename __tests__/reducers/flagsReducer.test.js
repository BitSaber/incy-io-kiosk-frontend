import flagsReducer from '../../src/reducers/flagsReducer';
import { setAllAnsweredAction, setShowErrorAction, setErrorMsgAction } from '../../src/actions/flagActions';

describe('flagsReducer', () => {
    it('should set the initial state', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        expect(state).toEqual({
            isAllQuestionsAnswered: false,
            error: {
                showError: false,
                messageId: "",
            }
        });
    })

    it('should change isAllQuestionsAnswered to true', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        const nextState = flagsReducer(state, setAllAnsweredAction(true));
        expect(nextState).toEqual({
            isAllQuestionsAnswered: true,
            error: {
                showError: false,
                messageId: "",
            }
        });
    })

    it('should change showError to true', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        const nextState = flagsReducer(state, setShowErrorAction(true));
        expect(nextState).toEqual({
            isAllQuestionsAnswered: false,
            error: {
                showError: true,
                messageId: "",
            }
        });
    })

    it('should change error.message to `test`', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' });
        const nextState = flagsReducer(state, setErrorMsgAction("test"));
        expect(nextState).toEqual({
            isAllQuestionsAnswered: false,
            error: {
                showError: false,
                messageId: "test",
            }
        });
    })
})