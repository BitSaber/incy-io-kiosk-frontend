import { TEXT_SEND } from '../actions/freetextActions'

const reducer = (state = "", action) => {
    if (action.type === TEXT_SEND) {
        return {
            ...state,
            text: action.payload
        }
    }
    return state
}

export default reducer;