import axios from 'axios'

const observationQuestionUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet';
const questionChoicesUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions-choices/links/staging-place-tarvikkeet/'


 const getQuestions = () => (
    axios
    .get(observationQuestionUrl)
   )

const getQuestionsChoices = (id) => (
    axios
    .get(questionChoicesUrl + id)
)

const GetQuestion = () => {
    const promise = getQuestions()
    console.log(promise)
    return (
        promise.then(response => {
            /*console.log(response.data)*/
            return response.data.data })
    )
}

const GetChoices = (id) => {
    const promise = getQuestionsChoices(id)
    return (
        promise.then(response => {
            return response.data.data
        })
    )
}

export default {GetQuestion, GetChoices}