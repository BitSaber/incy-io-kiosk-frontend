import { ADD_ANSWER, RESET_ANSWERS } from "../constants/actions";

const reducer = (state={}, action) => {
    if (action.type === ADD_ANSWER) {
        return {
            ...state,
            [action.payload.questionId]: action.payload.answer,
        };
    }

    if (action.type === RESET_ANSWERS) {
        return {};
    }

    return state;
};

export default reducer;
