import flagsReducer from '../../src/reducers/flagsReducer';
import { setAllAnsweredAction, setAllDisplayedAction } from '../../src/actions/flagActions';

describe('flagsReducer', () => {
    it('should set the initial state', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' } );
        expect(state).toEqual({
            isAllQuestionsAnswered: false,
            isAllQuestionsDisplayed: false,
        });
    })

    it('should change isAllQuestionsAnswered to true', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' } );
        const nextState = flagsReducer(state, setAllAnsweredAction(true) );
        expect(nextState).toEqual({
            isAllQuestionsAnswered: true,
            isAllQuestionsDisplayed: false,
        });
    })

    it('should change isAllQuestionsDisplayed to true', () => {
        const state = flagsReducer(undefined, { type: 'TEST_ACTION' } );
        const nextState = flagsReducer(state, setAllDisplayedAction(true) );
        expect(nextState).toEqual({
            isAllQuestionsAnswered: false,
            isAllQuestionsDisplayed: true,
        });
    })

})