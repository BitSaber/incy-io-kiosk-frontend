import reducer from '../../src/reducers/choiceReducer';
import { SET_AVAILABLE_CHOICES } from "../../src/constants/actions";

describe('choiceReducer', () => {
    it('should set the initial state', () => {
        const state = reducer(undefined, { type: 'TEST' });
        expect(state).toEqual({
            availableChoices: [],
            selectedChoices: [],
        });
    })

    it('should set the choices', () => {
        const state = reducer(undefined, { type: SET_AVAILABLE_CHOICES, payload: [{ id: 1 }] });
        expect(state).toEqual({
            availableChoices: [{ id: 1 }],
            selectedChoices: [],
        });
        const nextState = reducer(state, { type: SET_AVAILABLE_CHOICES, payload: [{ id: 2 }] });
        expect(nextState).toEqual({
            availableChoices: [{ id: 2 }],
            selectedChoices: [],
        });
    });
});