import { SET_QUESTIONS } from '../actions/questionActions';

const initialState = {
    allQuestions: [],
}

const reducer = (state=initialState, action) => {
    if (action.type === SET_QUESTIONS) {
        return {
            ...state,
            allQuestions: action.payload
        }
    }

    return state;
};

export default reducer;
