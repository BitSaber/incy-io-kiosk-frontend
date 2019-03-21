import { RESET_ALL_CHOICES, SET_ALL_CHOICES, SET_CURRENT_CHOICES, SET_SELECTED_CHOICES } from "../constants/actions";

const initialState = {
    allChoices: [],
    currentChoices: [],
    selectedChoices: [],
};

const reducer = (state=initialState, action) => {
    if (action.type === SET_ALL_CHOICES) {
        return {
            ...state,
            allChoices: action.payload,
        };
    }
    if (action.type === RESET_ALL_CHOICES) {
        return {
            ...state,
            allChoices: [],
        };
    }
    if (action.type === SET_CURRENT_CHOICES) {
        return {
            ...state,
            currentChoices: state.allChoices[action.payload-1],
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
