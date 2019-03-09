import { SET_ALL_ANSWERED, SET_ALL_DISPLAYED } from '../constants/actions';

const initialState = {
    isAllQuestionsAnswered: false,
    isAllQuestionsDisplayed: false,
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
    case SET_ALL_ANSWERED:
        return {
            ...state,
            isAllQuestionsAnswered: action.payload
        }
    case SET_ALL_DISPLAYED:
        return {
            ...state,
            isAllQuestionsDisplayed: action.payload
        }
    default:
        return state;
    }
}

export default reducer;
