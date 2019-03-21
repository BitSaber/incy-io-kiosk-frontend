import { addLocaleData } from "react-intl";
import { intlReducer } from "react-intl-redux";
import locale_en from 'react-intl/locale-data/en';
import locale_fi from 'react-intl/locale-data/fi';
import locale_sv from 'react-intl/locale-data/sv';

import messages_en from "../translations/en.json";

addLocaleData([...locale_en, ...locale_fi, ...locale_sv]);

export const initialState = {
    defaultLocale: 'en',
    locale: 'en',
    messages: messages_en,
};

export default intlReducer;
