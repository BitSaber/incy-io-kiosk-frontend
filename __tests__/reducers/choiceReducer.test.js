import reducer from '../../src/reducers/choiceReducer';
import { SET_CHOICES } from "../../src/actions/choiceActions";

describe('choiceReducer', () => {
    it('should set the initial state', () => {
        const state = reducer(undefined, { type: 'TEST' });
        expect(state).toEqual({
            currentChoices: []
        });
    })

    it('should set the choices', () => {
        const state = reducer(undefined, { type: SET_CHOICES, payload: [{ id: 1 }] });
        expect(state).toEqual({
            currentChoices: [{ id: 1 }]
        });
        const nextState = reducer(state, { type: SET_CHOICES, payload: [{ id: 2 }] });
        expect(nextState).toEqual({
            currentChoices: [{ id: 2 }]
        });
    });
});