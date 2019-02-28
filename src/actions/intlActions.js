import { updateIntl } from 'react-intl-redux';

import messages_en from "../translations/en.json";
import messages_fi from "../translations/fi.json";
import messages_sv from "../translations/sv.json";

const messages = {
    'fi': messages_fi,
    'sv': messages_sv,
    'en': messages_en
};

export const setLocaleAction = (locale) => {
    return updateIntl({
        locale,
        messages: messages[locale]
    });
};