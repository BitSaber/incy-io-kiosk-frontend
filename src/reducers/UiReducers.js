import { TEXT_CHANGE } from '../constants/actions';
//import { submitTextAnswer } from '../App' WILL BE USED LATER

const initialState = {
    freeText: { text: "" }
};

const reducer = (state = initialState, action) => {
    if (action.type === TEXT_CHANGE) {
        return {
            ...state,
            freeText: { text: action.text }
        };
    }
    //Will be used later
    /*   else if (action.type === TEXT_SUBMIT) {
           return submitTextAnswer(action.text)
       }*/

    return state;
};

export default reducer;