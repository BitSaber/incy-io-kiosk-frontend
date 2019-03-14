import { SET_ALL_ANSWERED, SET_SHOW_ERROR, SET_ERROR_MSG } from '../constants/actions';

const initialState = {
    isAllQuestionsAnswered: false,
    error: {
        showError: false,
        messageId: "",
    },
};

const reducer = (state=initialState, action) => {
    // XXX: Do not use switch statements. Use a lookup object or if-else.
    switch (action.type) {
    case SET_ALL_ANSWERED:
        return {
            ...state,
            isAllQuestionsAnswered: action.payload,
        };
    case SET_SHOW_ERROR:
        return {
            ...state,
            error: {
                ...state.error,
                showError: action.payload,
            },
        };
    case SET_ERROR_MSG:
        return {
            ...state,
            error: {
                ...state.error,
                messageId: action.payload,
            },
        };
    default:
        return state;
    }
};

export default reducer;
