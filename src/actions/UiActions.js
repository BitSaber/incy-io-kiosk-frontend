import {
    TEXT_CHANGE,
    TEXT_SUBMIT,
} from '../constants/Actions'

export const onTextChangeAction = text => ({
    type: TEXT_CHANGE,
    text: text,
});

export const submitTextAction = text => ({
    type: TEXT_SUBMIT,
    text: text,
})


