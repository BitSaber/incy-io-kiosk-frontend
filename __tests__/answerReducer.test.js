import deepFreeze from 'deep-freeze';

import answerReducer from '../src/reducers/answerReducer';
import { addAnswerAction, resetAnswersAction } from '../src/actions/answerActions';


describe('answerReducer', () => {
    it('should set the initial state', () => {
        const state = deepFreeze(answerReducer(undefined, { type: 'TEST_ACTION' }));
        expect(state).toEqual({});
    })

    it('should add an answer', () => {
        const state = deepFreeze(answerReducer(undefined, addAnswerAction({ questionId: 1, answer: 'test'})));
        expect(state).toEqual({
            '1': 'test'
        });
    })

    it('should add 2 answers', () => {
        const state = deepFreeze(answerReducer(undefined, addAnswerAction({ questionId: 1, answer: 'test1'})));
        const result = deepFreeze(answerReducer(state, addAnswerAction({questionId: 2, answer: 'test2'})));
        expect(result).toEqual({
            '1': 'test1',
            '2': 'test2',
        });
    })

    it('should reset the state', () => {
        const state = deepFreeze(answerReducer(undefined, addAnswerAction({ questionId: 1, answer: 'test1'})));
        const result = deepFreeze(answerReducer(state, resetAnswersAction()));
        expect(result).toEqual({});
    })
});