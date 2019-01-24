import axios from 'axios';
import Cookie from 'js-cookie';

import {
    DEFAULT_ORG_NAME,
    DEFAULT_LINK_NAME,
} from './constants/defaults';

import {
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
    if(typeof maybeValueFromCookie === 'string')
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
const questionsUrl = `https://app-staging.incy.io/api/${organizationName}/observation-questions/links/${linkName}`;
const choicesUrl = `https://app-staging.incy.io/api/${organizationName}/observation-questions-choices/links/${linkName}/`;
const categoryUrl = `https://app-staging.incy.io/api/${organizationName}/observation-categories/links/${linkName}`;
const placeUrl = `https://app-staging.incy.io/api/${organizationName}/places/links/${linkName}`;
const postUrl = `https://app-staging.incy.io/api/${organizationName}/observations/links/${linkName}`

/* A generic function for GETting the data.data from an URL. */
const getUrl = async (url) => {
    const response = await axios.get(url);
    return response.data.data;
}

const getCategory = () => {
    return getUrl(categoryUrl)
}

const getPlace = () => {
    return getUrl(placeUrl)
}

const getQuestions = () => {
    return getUrl(questionsUrl)
}

const getChoices = (id) => {
    return getUrl(choicesUrl + id)
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

export default { getUrl, getCategory, getPlace, getQuestions, getChoices, postObservation };
