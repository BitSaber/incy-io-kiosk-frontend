import { SET_CHOICES } from "../constants/actions";

const initialState = {
    currentChoices: [],
};

const reducer = (state=initialState, action) => {
    if (action.type === SET_CHOICES) {
        return {
            ...state,
            currentChoices: action.payload
        };
    }
    return state;
};

export default reducer;
