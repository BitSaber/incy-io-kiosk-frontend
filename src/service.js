import axios from 'axios';

const questionsUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet';
const choisesUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions-choices/links/staging-place-tarvikkeet/';

const getQuestions = async () => {
    const response = await axios.get(questionsUrl);
    return response.data.data;
};

const getChoices = async (id) => {
    const response =  await axios.get(choisesUrl + id);
    return response.data.data;
};

const postObservation = async (data) => { // eslint-disable-line
    axios.post('https://app-staging.incy.io/api/bitsaber-staging/observations/links/staging-place-tarvikkeet', data)
        .then(res => {
            console.log(res)
            console.log(res.data)
        }).catch(error => console.error(error));
};

export default { getQuestions, getChoices, postObservation };
