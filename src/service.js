import axios from 'axios'

const baseUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet'

 const getAll = () => (
    axios
    .get(baseUrl)
   )

const GetQuestion = () => {
    const promise = getAll()
    console.log(promise)
    return (
        promise.then(response => {
            /*console.log(response.data)*/
            return response.data.data })
    )
}

export default GetQuestion