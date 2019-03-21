import { SET_QUESTIONS_LOADING_STATE, SET_CHOICES_LOADING_STATE, SET_PLACE_LOADING_STATE,
    SET_CATEGORY_LOADING_STATE, RESET_LOADING_STATE } from '../constants/actions';
import { INIT_STATE } from '../constants/loadingStates';

const initialState = {
    questions: INIT_STATE,
    choices: INIT_STATE,
    context: {
        category: INIT_STATE,
        place: INIT_STATE,
    },
};

const reducer = (state=initialState, action) => {
    if (action.type === SET_QUESTIONS_LOADING_STATE) {
        return {
            ...state,
            questions: action.payload,
        };
    }
    if (action.type === SET_CHOICES_LOADING_STATE) {
        return {
            ...state,
            choices: action.payload,
        };
    }
    if (action.type === SET_CATEGORY_LOADING_STATE) {
        return {
            ...state,
            context: {
                ...state.context,
                category: action.payload,
            },
        };
    }
    if (action.type === SET_PLACE_LOADING_STATE) {
        return {
            ...state,
            context: {
                ...state.context,
                place: action.payload,
            },
        };
    }
    if (action.type === RESET_LOADING_STATE) {
        return {
            questions: INIT_STATE,
            choices: INIT_STATE,
            context: {
                category: INIT_STATE,
                place: INIT_STATE,
            },
        };
    }
    return state;
};

export default reducer;
