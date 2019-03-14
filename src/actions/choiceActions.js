import service from '../service';
import { GET_ALL_CHOICES, SET_CURRENT_CHOICES, SET_SELECTED_CHOICES } from '../constants/actions';


export const getAllChoicesAction = (questions, langId) => {
    return async (dispatch) => {
        // here we use a for-loop to go through all questions (preferably sorted in some fashion),
        // and dispatch them one by one to an array with all the possible choices
        var i;
        const qLen = questions.length;
        console.log(questions);
        for (i = 0; i < qLen; i++) {
            const choices = await service.getChoices(questions[i].id, langId);
            dispatch({
                type: GET_ALL_CHOICES,
                payload: choices,
            });
        }
    };
};

export const setCurrentChoicesAction = (choices) => ({
    type: SET_CURRENT_CHOICES,
    payload: choices,
});

export const setSelectedChoicesAction = (choices) => ({
    type: SET_SELECTED_CHOICES,
    payload: choices,
});
