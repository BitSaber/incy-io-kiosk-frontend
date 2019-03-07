
import { SET_FUNFACTS } from '../actions/funfactsActions';

const initialState = {
    place: [{
        id: 0,
    }],
    category: [{ id: 0, }]
}

const reducer = (state = initialState, action) => {
    if (action.type === SET_FUNFACTS) {
        return {
            ...state,
            place: action.payload.place,
            category: action.payload.category
        }
    }
    return state
}

export default reducer;
