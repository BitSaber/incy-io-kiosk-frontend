import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css';
import { addLocaleData, IntlProvider } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_fi from 'react-intl/locale-data/fi';
import locale_sv from 'react-intl/locale-data/sv';
import messages_en from "./translations/en.json";
import messages_fi from "./translations/fi.json";
import messages_sv from "./translations/sv.json";
import App from './App';

addLocaleData([...locale_en, ...locale_fi, ...locale_sv]);

const messages = {
    'fi': messages_fi,
    'sv': messages_sv,
    'en': messages_en
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <IntlProvider locale={language} messages={messages[language]}>
            <App />
        </IntlProvider>
    </React.Fragment>,
    document.getElementById('app')
);
