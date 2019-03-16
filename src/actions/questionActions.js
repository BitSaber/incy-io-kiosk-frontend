import service from '../service';

import { SET_QUESTIONS, SET_CURRENT_QUESTION } from '../constants/actions';

export const setQuestionsAction = (langId) => {
    return async (dispatch, getState) => {
        const { context } = getState();
        const categoryQuestionIDs = context.category[0].question_ids;

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
    };
};

export const setCurrentQuestionAction = (question) => ({
    type: SET_CURRENT_QUESTION,
    payload: question,
});

export default {
    setQuestionsAction,
};
