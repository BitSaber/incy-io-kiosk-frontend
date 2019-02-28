import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline'
import { addLocaleData } from "react-intl";
import { IntlProvider, intlReducer } from "react-intl-redux";
import locale_en from 'react-intl/locale-data/en';
import locale_fi from 'react-intl/locale-data/fi';
import locale_sv from 'react-intl/locale-data/sv';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import messages_en from "./translations/en.json";

addLocaleData([...locale_en, ...locale_fi, ...locale_sv]);

const reducer = combineReducers({
    intl: intlReducer
});

const initialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'en',
        messages: messages_en
    },
};

const store = createStore(reducer, initialState, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <IntlProvider>
            <App />
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);
