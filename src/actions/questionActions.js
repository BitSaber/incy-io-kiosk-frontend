export const GET_QUESTIONS = 'GET_QUESTIONS';
import service from '../service';

export const getQuestionsAction = (langId) => {
    return async (dispatch) => {
        const questions = await service.getQuestions(langId);
        const questionsSorted = questions.sort((object1, object2) => object1.id - object2.id)
        dispatch({
            type: GET_QUESTIONS,
            payload: questionsSorted,
        });
    };
};

export default {
    getQuestionsAction,
};
