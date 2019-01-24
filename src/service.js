import axios from 'axios';

const organizationName = findGetParameter('organisation')
const linkName = findGetParameter('link')
/* The open API links */
const questionsUrl = `https://app-staging.incy.io/api/${organizationName}/observation-questions/links/${linkName}`;
const choisesUrl = `https://app-staging.incy.io/api/${organizationName}/observation-questions-choices/links/${linkName}/`;
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
    return getUrl(choisesUrl + id)
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
