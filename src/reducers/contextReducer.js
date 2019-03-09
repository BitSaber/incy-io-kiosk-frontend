
import { SET_CONTEXT } from '../actions/contextActions';

const initialState = {
    place: [{
        id: 0,
    }],
    category: [{ id: 0, }]
}

const reducer = (state = initialState, action) => {
    if (action.type === SET_CONTEXT) {
        return {
            ...state,
            place: action.payload.place,
            category: action.payload.category
        }
    }
    return state
}

export default reducer;
