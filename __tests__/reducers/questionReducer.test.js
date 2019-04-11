import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/questionReducer';
import { SET_QUESTIONS, SET_CURRENT_QUESTION } from '../../src/constants/actions';

describe('questionReducer', () => {
    it('should set the initial state', () => {
        const state = deepFreeze(reducer(undefined, { type: 'TEST' }));
        expect(state).toEqual({
            allQuestions: [],
            currentQuestion: null,
            shownQuestions: [],
        });
    });

    it('should set the questions', () => {
        const state = deepFreeze(reducer(undefined, { type: SET_QUESTIONS, payload: [{ id: 1 }] }));
        expect(state).toEqual({
            allQuestions: [{ id: 1 }],
            currentQuestion: null,
            shownQuestions: [],
        });
        const nextState = deepFreeze(reducer(state, { type: SET_QUESTIONS, payload: [{ id: 2 }] }));
        expect(nextState).toEqual({
            allQuestions: [{ id: 2 }],
            currentQuestion: null,
            shownQuestions: [],
        });
    });

    it('should set the currentQuestion', () => {
        const state = deepFreeze(reducer(undefined, { type: SET_CURRENT_QUESTION, payload: { id: 1 } }));
        expect(state).toEqual({
            allQuestions: [],
            currentQuestion: {
                id: 1,
            },
            shownQuestions: [],
        });
        const nextState = deepFreeze(reducer(state, { type: SET_CURRENT_QUESTION, payload: { id: 2 } }));
        expect(nextState).toEqual({
            allQuestions: [],
            currentQuestion: {
                id: 2,
            },
            shownQuestions: [],
        });
    });
});
