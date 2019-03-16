import { TEXT_CHANGE, TEXT_RESET, UPDATE_PROGRESS, PROGRESS_RESET } from '../constants/actions';

const initialState = {
    freeText: { text: "" },
    progress: 0,
};

const reducer = (state = initialState, action) => {
    if (action.type === TEXT_CHANGE) {
        return {
            ...state,
            freeText: { text: action.text },
        };
    } else if (action.type === TEXT_RESET) {
        return {
            ...state,
            freeText: { text: "" },
        };
    }
    else if (action.type === UPDATE_PROGRESS) {
        return {
            ...state,
            progress: action.progress,
        };
    }
    else if (action.type === PROGRESS_RESET) {
        return {
            ...state,
            progress: 0,
        };
    }
    return state;
};

export default reducer;
