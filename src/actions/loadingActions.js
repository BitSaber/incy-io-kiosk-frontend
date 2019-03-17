import { SET_QUESTIONS_LOADING_STATE, SET_CHOICES_LOADING_STATE } from '../constants/actions';

// these may not be needed anywhere
export const setQuestionsLoadingState = value => ({
    type: SET_QUESTIONS_LOADING_STATE,
    payload: value,
});

export const setChoicesLoadingState = value => ({
    type: SET_CHOICES_LOADING_STATE,
    payload: value,
});
