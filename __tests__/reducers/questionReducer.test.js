import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/questionReducer';
import { SET_QUESTIONS, SET_CURRENT_QUESTION } from '../../src/actions/questionActions';

describe('questionReducer', () => {
    it('should set the initial state', () => {
        const state = deepFreeze(reducer(undefined, { type: 'TEST' }));
        expect(state).toEqual({
            allQuestions: [],
            currentQuestion: null
        });
    })

    it('should set the questions', () => {
        const state = deepFreeze(reducer(undefined, { type: SET_QUESTIONS, payload: [{ id: 1 }] }));
        expect(state).toEqual({
            allQuestions: [{ id: 1 }],
            currentQuestion: null
        });
        const nextState = deepFreeze(reducer(state, { type: SET_QUESTIONS, payload: [{ id: 2 }] }));
        expect(nextState).toEqual({
            allQuestions: [{ id: 2 }],
            currentQuestion: null
        });
    });

    it('should set the currentQuestion', () => {
        const state = deepFreeze(reducer(undefined, { type: SET_CURRENT_QUESTION, payload: { id: 1 } }));
        expect(state).toEqual({
            allQuestions: [],
            currentQuestion: {
                id: 1
            },
        });
        const nextState = deepFreeze(reducer(state, { type: SET_CURRENT_QUESTION, payload: { id: 2 } }));
        expect(nextState).toEqual({
            allQuestions: [],
            currentQuestion: {
                id: 2
            },
        });
    });
});
