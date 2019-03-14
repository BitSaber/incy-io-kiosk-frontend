import service from '../service';

import { SET_QUESTIONS, SET_CURRENT_QUESTION } from '../constants/actions';

export const setQuestionsAction = (langId) => {
    return async (dispatch) => {
        const questions = await service.getQuestions(langId);
        const questionsSorted = questions.sort((object1, object2) => object1.position - object2.position);
        dispatch({
            type: SET_QUESTIONS,
            payload: questionsSorted,
        });
    };
};

export const setCurrentQuestionAction = (question) => ({
    type: SET_CURRENT_QUESTION,
    payload: question,
});

export default {
    setQuestionsAction,
};
