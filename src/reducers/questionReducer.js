import { SET_QUESTIONS, SET_CURRENT_QUESTION } from "../constants/actions";

const initialState = {
    allQuestions: [],
    currentQuestion: null,
};

const reducer = (state=initialState, action) => {
    if (action.type === SET_QUESTIONS) {
        return {
            ...state,
            allQuestions: action.payload,
        };
    }

    if (action.type === SET_CURRENT_QUESTION) {
        return {
            ...state,
            currentQuestion: action.payload,
        };
    }

    return state;
};

export default reducer;
