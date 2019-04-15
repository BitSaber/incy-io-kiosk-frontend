import { ADD_ANSWER, RESET_ANSWERS, REMOVE_ANSWER } from "../constants/actions";

export const addAnswerAction = answer => ({
    type: ADD_ANSWER,
    payload: {
        questionId: answer.questionId,
        answer: answer.answer,
    },
});

export const removeAnswerAction = answerId => ({
    type: REMOVE_ANSWER,
    payload: answerId,
});

export const resetAnswersAction = () => ({
    type: RESET_ANSWERS,
});

export default {
    addAnswerAction,
    resetAnswersAction,
};
