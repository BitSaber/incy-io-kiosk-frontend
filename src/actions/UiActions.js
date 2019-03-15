import {
    TEXT_CHANGE,
    TEXT_SUBMIT,
    TEXT_RESET,
    UPDATE_PROGRESS,
    PROGRESS_RESET,
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

export const progressUpdateAction = progress => ({
    type: UPDATE_PROGRESS,
    progress: progress,
});

export const progressResetAction = () => ({
    type: PROGRESS_RESET,
});
