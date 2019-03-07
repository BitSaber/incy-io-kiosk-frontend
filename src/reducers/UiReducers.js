import { TEXT_CHANGE, TEXT_SUBMIT } from '../constants/Actions'
import { submitTextAnswer } from '../App'

const reducer = (state = {}, action) => {
    if (action.type === TEXT_CHANGE) {
        return {
            ...state,
            text: action.text
        }
    }
    else if (action.type === TEXT_SUBMIT) {
        return submitTextAnswer(action.text)
    }

    return state
}

export default reducer;