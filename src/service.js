import axios from 'axios'

const baseUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet'

const getAll = () => {
    return axios.get(baseUrl)
  }

const GetQuestion = () => {
    console.log(getAll())
    return (
        "Onko maito lämmintä?"
    )
}

export default GetQuestion