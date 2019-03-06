
import { SET_FUNFACTS } from '../actions/funfactsActions';

const initialState = {
    place: {
        "data": [
            {
                "id": 0,
            }
        ]
    },
    category: {"data" : [{"id":0,}]}
}

const reducer = (state = initialState, action) => {
    if (action.type === SET_FUNFACTS) {
        return {
            ...state,
            place: action.place,
            category: action.category
        }
    }
    return state
}

export default reducer;
