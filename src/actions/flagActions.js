import { SET_ALL_ANSWERED, SET_ALL_DISPLAYED, SET_SHOW_ERROR } from "../constants/actions";

export const setAllAnsweredAction = value => ({
    type: SET_ALL_ANSWERED,
    payload: value
});

export const setAllDisplayedAction = value => ({
    type: SET_ALL_DISPLAYED,
    payload: value
});

export const setShowErrorAction = value => ({
    type: SET_SHOW_ERROR,
    payload: value
});

export default {
    setAllAnsweredAction,
    setAllDisplayedAction,
    setShowErrorAction,
};
