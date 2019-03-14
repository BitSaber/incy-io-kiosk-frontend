import {
    TEXT_CHANGE,
    TEXT_SUBMIT,
    TEXT_RESET,
} from '../constants/actions';

export const onTextChangeAction = text => ({
    type: TEXT_CHANGE,
    text: text,
});

export const submitTextAction = text => ({
    type: TEXT_SUBMIT,
    text: text,
});

export const resetTextAction = () => ({
    type: TEXT_RESET,
});
