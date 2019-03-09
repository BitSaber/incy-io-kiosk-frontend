import service from '../service';
import { SET_AVAILABLE_CHOICES, SET_SELECTED_CHOICES } from '../constants/actions';

export const setAvailableChoicesAction = (questionId, langId) => {
    return async (dispatch) => {
        const choices = await service.getChoices(questionId, langId);
        dispatch({
            type: SET_AVAILABLE_CHOICES,
            payload: choices,
        });
    };
};

export const setSelectedChoicesAction = (choices) => ({
    type: SET_SELECTED_CHOICES,
    payload: choices,
});
