import { ADD_ANSWER, RESET_ANSWERS, SKIP_ANSWER, REMOVE_ANSWER } from "../constants/actions";

const initialState = {
    answers: {},
    skippedQuestionIds: [],
};

const reducer = (state=initialState, action) => {
    if (action.type === ADD_ANSWER) {
        return {
            ...state,
            answers: {
                ...state.answers,
                [action.payload.questionId]: action.payload.answer,
            },
        };
    }

    if (action.type === SKIP_ANSWER) {
        return {
            ...state,
            skippedQuestionIds: [ ...state.skippedQuestionIds, action.payload ],
        };
    }

    if (action.type === REMOVE_ANSWER) {
        var previousAnswers = state.answers;
        delete previousAnswers[action.payload];
        return {
            ...state,
            answers: {
                ...previousAnswers,
            },
        };
    }

    if (action.type === RESET_ANSWERS) {
        return initialState;
    }

    return state;
};

export default reducer;
