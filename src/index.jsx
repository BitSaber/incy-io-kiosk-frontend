import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';

import './index.css';
import App from './containers/App';

import store from './store/';

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <IntlProvider>
            <App />
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);
