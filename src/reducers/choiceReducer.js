import {
    RESET_ALL_CHOICES,
    SET_CHOICES,
    APPEND_CHOICE,
    SET_CURRENT_CHOICES,
    SET_SELECTED_CHOICES,
} from "../constants/actions";

const initialState = {
    allChoices: [],
    currentChoices: [],
    selectedChoices: [],
};

const reducer = (state=initialState, action) => {
    if (action.type === APPEND_CHOICE) {
        return {
            ...state,
            allChoices: [...state.allChoices, action.payload],
        };
    } else if(action.type === SET_CHOICES) {
        return {
            ...state,
            allChoices: action.payload,
        };
    } else if (action.type === RESET_ALL_CHOICES) {
        return {
            ...state,
            allChoices: [],
        };
    } else if (action.type === SET_CURRENT_CHOICES) {
        return {
            ...state,
            currentChoices: state.allChoices[action.payload-1],
        };
    } else if (action.type === SET_SELECTED_CHOICES) {
        return {
            ...state,
            selectedChoices: action.payload,
        };
    }
    return state;
};

export default reducer;
