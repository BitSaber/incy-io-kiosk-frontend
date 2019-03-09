
import { SET_CATEGORY, SET_PLACE } from '../actions/contextActions';

const initialState = {
    place: [{ id: 0,  }],
    category: [{ id: 0, }],
};

const reducer = (state = initialState, action) => {
    if (action.type === SET_CATEGORY) {
        return {
            ...state,
            category: action.payload
        }
    }
    if (action.type === SET_PLACE) {
        return {
            ...state,
            place: action.payload,
        };
    }

    return state
}

export default reducer;
