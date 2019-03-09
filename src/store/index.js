import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import intlReducer, { initialState as initialStateIntl } from '../reducers/intlReducer';
import answerReducer from '../reducers/answerReducer';
import questionReducer from '../reducers/questionReducer';
import contextReducer from '../reducers/contextReducer';

const initialState = {
    intl: initialStateIntl
}

const combinedReducers = combineReducers({
    intl: intlReducer,
    answers: answerReducer,
    questions: questionReducer,
    context: contextReducer
});

const composedMiddleware = composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
    )
)

const store = createStore(
    combinedReducers,
    initialState,
    composedMiddleware
)

export default store;
