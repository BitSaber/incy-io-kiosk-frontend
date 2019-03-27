import { ADD_ANSWER, RESET_ANSWERS, SKIP_ANSWER, CLEAN_ANSWERS } from "../constants/actions";

export const addAnswerAction = answer => ({
    type: ADD_ANSWER,
    payload: {
        questionId: answer.questionId,
        answer: answer.answer,
    },
});

export const skipAnswerAction = answerId => ({
    type: SKIP_ANSWER,
    payload: answerId,
});

export const cleanAnswersAction = () => ({
    type: CLEAN_ANSWERS,
});

export const resetAnswersAction = () => ({
    type: RESET_ANSWERS,
});

export default {
    addAnswerAction,
    resetAnswersAction,
};
