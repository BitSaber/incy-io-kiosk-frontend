import { SET_ALL_ANSWERED, SET_ALL_DISPLAYED, SET_SHOW_ERROR, SET_ERROR_MSG } from '../constants/actions';

const initialState = {
    isAllQuestionsAnswered: false,
    isAllQuestionsDisplayed: false,
    error: {
        showError: false,
        messageId: "",
    },
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
    case SET_ALL_ANSWERED:
        return {
            ...state,
            isAllQuestionsAnswered: action.payload
        };
    case SET_ALL_DISPLAYED:
        return {
            ...state,
            isAllQuestionsDisplayed: action.payload
        };
    case SET_SHOW_ERROR:
        return {
            ...state,
            error: {
                ...state.error,
                showError: action.payload,
            }
        };
    case SET_ERROR_MSG:
        return {
            ...state,
            error: {
                ...state.error,
                messageId: action.payload,
            }
        };
    default:
        return state;
    }
};

export default reducer;
