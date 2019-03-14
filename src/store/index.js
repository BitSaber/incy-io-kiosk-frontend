import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import intlReducer, { initialState as initialStateIntl } from '../reducers/intlReducer';
import answerReducer from '../reducers/answerReducer';
import uiReducer from '../reducers/UiReducers';
import questionReducer from '../reducers/questionReducer';
import contextReducer from '../reducers/contextReducer';
import flagsReducer from '../reducers/flagsReducer';
import choiceReducer from '../reducers/choiceReducer';

const initialState = {
    intl: initialStateIntl,
};

const combinedReducers = combineReducers({
    intl: intlReducer,
    answers: answerReducer,
    ui: uiReducer,
    progress: uiReducer,
    questions: questionReducer,
    context: contextReducer,
    flags: flagsReducer,
    choices: choiceReducer,
});

const composedMiddleware = composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
    )
);

const store = createStore(
    combinedReducers,
    initialState,
    composedMiddleware
);

export default store;
