import service from '../service';

import { SET_QUESTIONS, SET_CURRENT_QUESTION, SET_QUESTIONS_LOADING_STATE, ADD_SHOWN_QUESTION, REMOVE_SHOWN_QUESTION, RESET_SHOWN_QUESTIONS } from '../constants/actions';
import { LOADING_STATE, FINISHED_STATE } from '../constants/loadingStates';

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
        const questions = await service.getQuestions(langId);

        // sort them by their position
        const sorted = questions.sort((object1, object2) => object1.position - object2.position);

        // filter out questions that are not in this category's list of questions
        const filtered = sorted.filter(question => categoryQuestionIDs.includes(question.id));

        dispatch({
            type: SET_QUESTIONS,
            payload: filtered,
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

export const addShownQuestionAction = (question) => ({
    type: ADD_SHOWN_QUESTION,
    payload: question.id,
});

export const removeShownQuestionAction = (question) => ({
    type: REMOVE_SHOWN_QUESTION,
    payload: question.id,
});

export const resetShownQuestionsAction = () => ({
    type: RESET_SHOWN_QUESTIONS,
});

export default {
    setQuestionsAction,
};
