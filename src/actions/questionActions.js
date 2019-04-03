import service from '../service';

import { SET_QUESTIONS, SET_CURRENT_QUESTION, SET_QUESTIONS_LOADING_STATE } from '../constants/actions';
import { LOADING_STATE, FINISHED_STATE, ERROR_STATE } from '../constants/loadingStates';

export const setQuestionsAction = (langId) => {
    return async (dispatch, getState) => {
        // set the lodaing state to load
        dispatch({
            type: SET_QUESTIONS_LOADING_STATE,
            payload: LOADING_STATE,
        });
        const { context } = getState();
        const categoryQuestionIDs = context.category.question_ids;
        // get all questions
        try {
            const questions = await service.getQuestions(langId);

            // sort them by their position
            const sorted = questions.sort((object1, object2) => object1.position - object2.position);

            // filter out questions that are not in this category's list of questions
            const filtered = sorted.filter(question => categoryQuestionIDs.includes(question.id));

            dispatch({
                type: SET_QUESTIONS,
                payload: filtered,
            });
        } catch(err) {
            dispatch({
                type: SET_QUESTIONS_LOADING_STATE,
                payload: ERROR_STATE,
            });
            return;
        }

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
