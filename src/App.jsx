import React, { Component } from 'react';
import './css/style.css';
//import './service.js'
import axios from 'axios'

const observationQuestionUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet';
const element = <button className="myButton">Yes</button>
const element1 = <button className="myButton1" onClick={ActionLink}>No</button>
const q = GetQuestion.apply(7366).then(json => json.data.data.name).catch(error => alert(error))
const question = <h1>{q}</h1>  // Insert the API question here


const getQuestions = () => (
    axios
        .get(observationQuestionUrl)
)

const GetQuestion = () => {
    const promise = getQuestions()
    // console.log(promise)
    return (
        promise.then(response => {
            return response.data.data
        })
    )
}



class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            // Insert API answers
            <body>

                <div className="center-align">
                    <div className="txt" >
                        {question}
                    </div>

                    <div>
                        {element}
                        {element1}
                    </div>

                </div>

            </body>
        )


    }


}

function ActionLink(event) {
    event.currentTarget.style.backgroundColor = '#ccc';

}


export default App
