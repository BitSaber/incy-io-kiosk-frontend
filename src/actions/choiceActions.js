import service from '../service';
import { RESET_ALL_CHOICES, SET_CHOICES, SET_SELECTED_CHOICES, SET_CHOICES_LOADING_STATE } from '../constants/actions';
import { LOADING_STATE, FINISHED_STATE, ERROR_STATE } from '../constants/loadingStates';

export const getAllChoicesAction = (questions, langId) => {
    return async (dispatch) => {
        // set the lodaing state to load
        dispatch({
            type: SET_CHOICES_LOADING_STATE,
            payload: LOADING_STATE,
        });
        // we first reset the choices incase we are changing language
        dispatch({
            type: RESET_ALL_CHOICES,
        });

        try {
            // gets the choices concurrently
            const choices = await Promise.all(questions.map(async question => {
                const questionChoices = await service.getChoices(question.id, langId);
                return {
                    questionId: question.id,
                    questionChoices,
                };
            }));
            dispatch({
                type: SET_CHOICES,
                payload: choices,
            });
        } catch (e) {
            dispatch({
                type: SET_CHOICES_LOADING_STATE,
                payload: ERROR_STATE,
            });
            throw new Error('Error in getting choices:', e);
        }
        dispatch({
            type: SET_CHOICES_LOADING_STATE,
            payload: FINISHED_STATE,
        });
    };
};

export const setSelectedChoicesAction = (choices) => ({
    type: SET_SELECTED_CHOICES,
    payload: choices,
});
