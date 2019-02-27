import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css';
import DEFAULT_LANG from './constants/defaults.js';
import { addLocaleData, IntlProvider } from "react-intl";


import App from './App';

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <IntlProvider locale={DEFAULT_LANG}>
            <App />
        </IntlProvider>
    </React.Fragment>,
    document.getElementById('app')
);
