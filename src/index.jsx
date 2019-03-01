import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IntlProvider } from 'react-intl-redux';

import './index.css';
import App from './App';
import intlReducer, { initialState } from './reducers/intlReducer';
import answerReducer from './reducers/answerReducer';

const reducer = combineReducers({
    intl: intlReducer,
    answers: answerReducer,
});

const store = createStore(
    reducer,
    {
        intl: initialState
    },
    composeWithDevTools()
);

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <IntlProvider>
            <App />
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);
