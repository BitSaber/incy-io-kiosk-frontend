import React, { Component } from 'react';
import './css/style.css';
//import './service.js'
import axios from 'axios'

const observationQuestionUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet';
const element = <button className="myButton">Yes</button>
const element1 = <button className="myButton1" onClick={ActionLink}>No</button>


function getQuestions() {
    return axios
        .get(observationQuestionUrl)
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorOccurred: false,
            errorMessage: null,
            loading: false,
            questions: []
        }
        getQuestions()
            .then(response => {
                this.setState({
                    loading: false,
                    errorOccurred: false,
                    errorMessage: null,
                    questions: response.data.data
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    errorOccurred: true,
                    errorMessage: error
                })
            })
    }


    render() {

        const questionElems = []
        this.state.questions.forEach((value, key) => {
            console.log(key, value) // eslint-disable-line
            questionElems.push(
                <li key={'question_'+value.id}>{value.name}</li>
            )
        })

        return (
            // Insert API answers
            <div className="center-align">
                <div className="txt">
                    <h1>
                        <ul>
                            {questionElems}
                        </ul>
                    </h1>
                </div>
                {this.state.errorOccurred ? this.state.errorMessage : 'All\'s good in the neighbourhood!'}

                <div>
                    {element}
                    {element1}
                </div>

            </div>
        )
    }
}

function ActionLink(event) {
    event.currentTarget.style.backgroundColor = '#ccc';

}


export default App
