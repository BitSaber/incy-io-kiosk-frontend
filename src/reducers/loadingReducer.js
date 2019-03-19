import { SET_QUESTIONS_LOADING_STATE, SET_CHOICES_LOADING_STATE } from '../constants/actions';
import { INIT_STATE } from '../constants/loadingStates';

const initialState = {
    questions: INIT_STATE,
    choices: INIT_STATE,
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
    return state;
};

export default reducer;
