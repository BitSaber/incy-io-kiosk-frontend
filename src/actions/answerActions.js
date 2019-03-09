import { ADD_ANSWER, RESET_ANSWERS } from "../constants/actions";

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