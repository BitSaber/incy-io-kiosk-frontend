import { TEXT_CHANGE, TEXT_RESET, UPDATE_PROGRESS } from '../constants/actions';

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
    return state;
};

export default reducer;
