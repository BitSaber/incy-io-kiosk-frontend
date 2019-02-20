import axios from 'axios';
import Cookie from 'js-cookie';

import {
    DEFAULT_ORG_NAME,
    DEFAULT_LINK_NAME,
} from './constants/defaults';

import {
    BASE_API_URL,
    ORG_NAME_COOKIE,
    LINK_NAME_COOKIE,
    ORG_NAME_URLPARAM,
    LINK_NAME_URLPARAM,
} from './constants/config';

const getValueFromCookieUrlOrDefaultAndCache = (defaultValue, urlParam, cookieName) => {
    const maybeValueFromUrl = findGetParameter(urlParam)
    if(maybeValueFromUrl !== null && typeof maybeValueFromUrl === 'string') {
        // We're passing in a parameter, if empty, reset.
        if(maybeValueFromUrl === '' && typeof Cookie.get(cookieName) !== 'undefined') {
            Cookie.remove(cookieName)
        } else {
            Cookie.set(cookieName, maybeValueFromUrl);
            return maybeValueFromUrl;
        }
    }
    const maybeValueFromCookie = Cookie.get(cookieName);
    if(typeof maybeValueFromCookie === 'string' && maybeValueFromCookie !== '')
        return maybeValueFromCookie;
    return defaultValue;
}

const organizationName = getValueFromCookieUrlOrDefaultAndCache(
    DEFAULT_ORG_NAME,
    ORG_NAME_URLPARAM,
    ORG_NAME_COOKIE
)

const linkName = getValueFromCookieUrlOrDefaultAndCache(
    DEFAULT_LINK_NAME,
    LINK_NAME_URLPARAM,
    LINK_NAME_COOKIE
)


/* The open API links */
const questionsUrl = `${BASE_API_URL}/${organizationName}/observation-questions/links/${linkName}`;
const choicesUrl = `${BASE_API_URL}/${organizationName}/observation-questions-choices/links/${linkName}/`;
const categoryUrl = `${BASE_API_URL}/${organizationName}/observation-categories/links/${linkName}`;
const placeUrl = `${BASE_API_URL}/${organizationName}/places/links/${linkName}`;
const postUrl = `${BASE_API_URL}/${organizationName}/observations/links/${linkName}`;
const availableLangUrl = `${BASE_API_URL}/${organizationName}/available-languages`
const currentLangUrl = `${BASE_API_URL}/${organizationName}/current-language`

// not used
const getCurrentLang = () => {
    return getUrl(currentLangUrl)
}

/* A generic function for GETting the data.data from an URL. */
const getUrl = async (url, headers) => {
    const response = await axios.get(url, headers).catch(err => {
        console.error(err); // eslint-disable-line
    });
    return response.data.data;
}

const getLanguages = () => {
    return getUrl(availableLangUrl)
}

const getCategory = (langId) => {
    return getUrl(categoryUrl, { headers: {
        "Accept-Language": (langId + ';q=1')
    }
    })
}

const getPlace = (langId) => {
    return getUrl(placeUrl, { headers: {
        "Accept-Language": (langId + ';q=1')
    }
    })
}

const getQuestions = (langId) => {
    return getUrl(questionsUrl, { headers: {
        "Accept-Language": (langId + ';q=1')
    }
    })
}

const getChoices = (id, langId) => {
    return getUrl(choicesUrl + id, { headers: {
        "Accept-Language": (langId + ';q=1')
    }
    })
}

const postObservation = async (data) => { // eslint-disable-line
    axios.post(postUrl, data)
        .catch(error => console.error(error)); // eslint-disable-line
};

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

export default { getUrl, getCategory, getPlace, getLanguages, getQuestions, getChoices, postObservation, getCurrentLang };
