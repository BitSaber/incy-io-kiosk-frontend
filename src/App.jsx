import React, { Component } from 'react';
import './css/style.css';
import './css/animations.css';
/*import './images/planblogo.png';*/
import axios from 'axios';

const observationQuestionUrl = 'https://app-staging.incy.io/api/bitsaber-staging/observation-questions/links/staging-place-tarvikkeet';
const element = <button className="newButton">Kyllä</button>
const element1 = <button className="newButton" >Ei</button>


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
                <button key={'answer_' + value.id} className="newButton"  > {value.name}</button >
            )
        })





        return (
            // Insert API answers
            <div>
                <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img> </div>
                <div className="question-div ">
                    <h2 className="txt">Oletko tyytyväinen huoneen tarvikkeisiin?</h2>
                </div>

                <div>
                    <div className="center-align">
                        {element}
                        {element1}
                    </div>
                </div>
                <footer className="footer">
                    <footer className="inside">
                        <p>Copyright © 2018 BitSaber, Otaniemi, Finland</p>
                        <div className="under">
                            <ul>
                                <li> <a href="https://github.com/BitSaber/incy-io-kiosk-frontend" target="_blank" rel="noopener noreferrer">GitHub</a> </li>
                            </ul>
                        </div>
                    </footer>
                </footer>
            </div >
        )
    }
}





export default App
