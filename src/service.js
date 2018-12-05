import axios from 'axios'

const observationQuestionUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet';
const questionChoicesUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions-choices/links/staging-place-tarvikkeet/'


// XXX: is it really nescessary to have the URL as a 'global'?
const getQuestions = () =>
    axios.get(observationQuestionUrl)

const getQuestionsChoices = (id) =>
    axios.get(questionChoicesUrl + id)

// XXX: Please don't use PascalCase for functions. That should be done for classes only.
// Please use camelCase
const GetQuestion = () => {
    const promise = getQuestions()
    return (
        promise.then(response => {
            // console.log(response.data)
            return response.data.data
        })
    )
}

// XXX: Please don't use PascalCase for functions. That should be done for classes only.
// Please use camelCase
const GetChoices = (id) => {
    const promise = getQuestionsChoices(id)
    return (
        promise.then(response => {
            return response.data.data
        })
    )
}

export {GetQuestion, GetChoices}
