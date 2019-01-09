import axios from 'axios';

/* The open API links */
const questionsUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet';
const choisesUrl =   'https://app-staging.incy.io/api/bitsaber-staging/observation-questions-choices/links/staging-place-tarvikkeet/';
const categoryUrl =  'https://app-staging.incy.io/api/bitsaber-staging/observation-categories/links/staging-place-tarvikkeet';
const placeUrl =     'https://app-staging.incy.io/api/bitsaber-staging/places/links/staging-place-tarvikkeet?page=1&per_page=5000&q=';

/* A generic function for GETting the data.data from an URL. */
const getUrl = async (url) => {
    const response = await axios.get(url);
    return response.data.data;
}

const getCategory = () => {
    const res = getUrl(categoryUrl)
    console.log(res[0])
    return res
}

const getPlace = () => {
    return getUrl(placeUrl).id
}

const getQuestions = () => {
    return getUrl(questionsUrl)
}

const getChoices = (id) => {
    return getUrl(choisesUrl + id)
}

const postObservation = async (data) => { // eslint-disable-line
    axios.post('https://app-staging.incy.io/api/bitsaber-staging/observations/links/staging-place-tarvikkeet', data)
        .catch(error => console.error(error));
};

export default { getUrl, getCategory, getPlace, getQuestions, getChoices, postObservation };
