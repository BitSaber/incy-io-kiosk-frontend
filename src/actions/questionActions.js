export const SET_QUESTIONS = 'SET_QUESTIONS';
import service from '../service';

export const setQuestionsAction = (langId) => {
    return async (dispatch) => {
        const questions = await service.getQuestions(langId);
        const questionsSorted = questions.sort((object1, object2) => object1.position - object2.position)
        dispatch({
            type: SET_QUESTIONS,
            payload: questionsSorted,
        });
    };
};

export default {
    setQuestionsAction,
};
