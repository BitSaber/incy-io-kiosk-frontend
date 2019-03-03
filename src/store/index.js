import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import intlReducer, { initialState as initialStateIntl } from '../reducers/intlReducer';
import answerReducer from '../reducers/answerReducer';

const initialState = {
    intl: initialStateIntl
}

const combinedReducers = combineReducers({
    intl: intlReducer,
    answers: answerReducer,
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
