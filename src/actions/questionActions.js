export const SET_QUESTIONS = 'SET_QUESTIONS';
import service from '../service';

export const setQuestionsAction = (langId) => {
    return async (dispatch) => {
        const questions = await service.getQuestions(langId);
        const questionsSorted = questions.sort((object1, object2) => object1.id - object2.id)
        dispatch({
            type: SET_QUESTIONS,
            payload: questionsSorted,
        });
    };
};

export default {
    setQuestionsAction,
};
