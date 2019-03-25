import { RESET_ALL_CHOICES, SET_CHOICES, SET_SELECTED_CHOICES } from "../constants/actions";

const initialState = {
    questionChoices: [],
    selectedChoices: [],
};

const reducer = (state=initialState, action) => {
    if (action.type === SET_CHOICES) {
        return {
            ...state,
            questionChoices: action.payload,
        };
    }
    if (action.type === RESET_ALL_CHOICES) {
        return {
            ...state,
            questionChoices: [],
        };
    }
    if (action.type === SET_SELECTED_CHOICES) {
        return {
            ...state,
            selectedChoices: action.payload,
        };
    }
    return state;
};

export default reducer;
