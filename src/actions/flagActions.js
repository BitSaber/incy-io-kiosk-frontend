import { SET_ALL_ANSWERED, SET_ALL_DISPLAYED } from "../constants/actions";

export const setAllAnsweredAction = value => ({
    type: SET_ALL_ANSWERED,
    payload: value
});

export const setAllDisplayedAction = value => ({
    type: SET_ALL_DISPLAYED,
    payload: value
});

export default {
    setAllAnsweredAction,
    setAllDisplayedAction,
};
