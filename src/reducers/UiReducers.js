import { TEXT_CHANGE, TEXT_SUBMIT } from '../constants/actions'
//import { submitTextAnswer } from '../App'

const initialState = {
    freeText: { text: "" }
}

const reducer = (state = initialState, action) => {
    if (action.type === TEXT_CHANGE) {
        return {
            ...state,
            freeText: { text: action.text }
        }
    }
    else if (action.type === TEXT_SUBMIT) {
        //    return submitTextAnswer(action.text)
    }

    return state
}

export default reducer;