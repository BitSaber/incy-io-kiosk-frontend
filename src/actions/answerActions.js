export const ADD_ANSWER = 'ADD_ANSWER';
export const RESET_ANSWERS = 'RESET_ANSWERS';

export const addAnswerAction = answer => ({
    type: ADD_ANSWER,
    payload: {
        questionId: answer.questionId,
        answer: answer.answer,
    }
});

export const resetAnswersAction = () => ({
    type: RESET_ANSWERS,
});

export default {
    addAnswerAction,
    resetAnswersAction,
};