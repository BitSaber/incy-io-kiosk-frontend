import { SET_CHOICES } from "../constants/actions";

const initialState = {
    availableChoices: [],
};

const reducer = (state=initialState, action) => {
    if (action.type === SET_CHOICES) {
        return {
            ...state,
            availableChoices: action.payload
        };
    }
    return state;
};

export default reducer;
