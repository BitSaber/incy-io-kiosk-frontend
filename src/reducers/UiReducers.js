import { TEXT_CHANGE } from '../constants/Actions'

const reducer = (state = {}, action) => {
    if (action.type === TEXT_CHANGE) {
        return {
            ...state,
            text: action.text
        }
    }
    return state
}

export default reducer;