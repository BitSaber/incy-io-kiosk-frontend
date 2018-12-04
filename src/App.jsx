import React, { Component } from 'react';
import './css/style.css';
//import './service.js'
import axios from 'axios'

const observationQuestionUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet';
// const answerQuestionUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet/7366';
//const element = <button className="myButton">Yes</button>
const element1 = <button className="myButton1" >No</button>


function getQuestions() {
    return axios
        .get(observationQuestionUrl)
}

function showAlert() {
    alert("Im an alert");
}

// function getAnswers() {
//     return axios
//         .get(answerQuestionUrl)
// }

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorOccurred: false,
            errorMessage: null,
            loading: false,
            questions: [],
            answers: []
        }
        getQuestions()
            .then(response => {
                this.setState({
                    loading: false,
                    errorOccurred: false,
                    errorMessage: null,
                    questions: response.data.data,
                    answers: response.data.data
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    errorOccurred: true,
                    errorMessage: error
                })
            })

        // getAnswers()
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //             errorOccurred: false,
        //             errorMessage: null,
        //             answers: response.data.data
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //             errorOccurred: true,
        //             errorMessage: error
        //         })
        //     })
    }




    render() {

        const questionElems = []
        this.state.questions.forEach((value, key) => {
            console.log(key, value) // eslint-disable-line
            questionElems.push(
                <h1 key={'question_' + value.id}>{value.name}</h1>
            )
        })

        const answerElems = []
        this.state.answers.forEach((value, key) => {
            console.log(key.value) // eslint-disable-line
            answerElems.push(
                <button key={'answer_' + value.id} className="myButton" onClick={showAlert} > {value.name}</button >
            )
        })





        return (
            // Insert API answers
            <div className="center-align">
                <div className="txt">
                    {questionElems[0]}
                </div>
                {this.state.errorOccurred ? this.state.errorMessage : 'All\'s good in the neighbourhood!'}

                <div>
                    {answerElems[0]}
                    {element1}
                </div>

            </div>
        )
    }
}





export default App
