export const SET_ALL_ANSWERED = 'SET_ALL_ANSWERED';
export const SET_ALL_DISPLAYED = 'SET_ALL_DISPLAYED';

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
