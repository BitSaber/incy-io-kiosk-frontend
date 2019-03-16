import service from '../service';

import { SET_QUESTIONS, SET_CURRENT_QUESTION, SET_QUESTIONS_LOADING_STATE } from '../constants/actions';
import { LOADING_STATE, FINISHED_STATE } from '../constants/loadingStates';

export const setQuestionsAction = (langId) => {
    return async (dispatch) => {
        // set the lodaing state to load
        dispatch({
            type: SET_QUESTIONS_LOADING_STATE,
            payload: LOADING_STATE,
        });
        const questions = await service.getQuestions(langId);
        const questionsSorted = questions.sort((object1, object2) => object1.position - object2.position);
        dispatch({
            type: SET_QUESTIONS,
            payload: questionsSorted,
        });
        // set the lodaing state to be finished
        dispatch({
            type: SET_QUESTIONS_LOADING_STATE,
            payload: FINISHED_STATE,
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
