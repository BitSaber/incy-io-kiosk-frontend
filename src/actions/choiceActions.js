import service from '../service';

export const SET_CHOICES = 'SET_CHOICES';

export const setChoicesAction = (questionId, langId) => {
    return async (dispatch) => {
        const choices = await service.getChoices(questionId, langId);
        dispatch({
            type: SET_CHOICES,
            payload: choices,
        });
    };
};
