import service from '../service';
import { SET_CHOICES } from '../constants/actions';

export const setAvailableChoicesAction = (questionId, langId) => {
    return async (dispatch) => {
        const choices = await service.getChoices(questionId, langId);
        dispatch({
            type: SET_CHOICES,
            payload: choices,
        });
    };
};
