import { SET_AVAILABLE_CHOICES, SET_SELECTED_CHOICES } from "../constants/actions";

const initialState = {
    availableChoices: [],
    selectedChoices: [],
};

const reducer = (state=initialState, action) => {
    if (action.type === SET_AVAILABLE_CHOICES) {
        return {
            ...state,
            availableChoices: action.payload,
        };
    }
    if (action.type === SET_SELECTED_CHOICES) {
        return {
            ...state,
            selectedChoices: action.payload,
        }
    }
    return state;
};

export default reducer;
