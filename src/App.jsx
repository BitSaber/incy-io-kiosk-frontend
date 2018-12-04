import React, { Component } from 'react';
import { GetQuestion, GetChoices } from './service'
import Typography from '@material-ui/core/Typography'
import './index.css'
import Button from '@material-ui/core/Button'

const initialState = {
    counter: 1,
    currentId: 5090,
    observationQuestions: [],
    questionsChoices: [],
    observationAnswer: []
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.initializeQuestions = this.initializeQuestions.bind(this)
        this.initializeQuestions()
    }

    clickGet() {
        this.setState({
            counter: this.state.counter + 1,
        });
        GetQuestion().then((questions) => {
            this.setState({
                observationQuestions: questions
            })
        })
    }

    initializeQuestions() {
        GetQuestion().then((questions) => {
            this.setState({
                observationQuestions: questions
            })
        })
    }

    clickChoices() {
        GetChoices(this.state.currentId).then((choices) => {
            this.setState({
                questionsChoices: choices
            })
            console.log(this.state) // eslint-disable-line
        })
    }

    clickHandler(answer) {
        const count = this.state.counter
        const obsAns = this.state.observationAnswer
        this.setState ({
            counter: count + 1,
            observationAnswer: [...obsAns].concat(answer)
        })
        console.log(obsAns) // eslint-disable-line
    }

    submitObservation() {
        //TODO: Post observation
        setTimeout(() => {
            this.setState(initialState)
            this.initializeQuestions()
        }, 3000)
    }

    render() {
        const TestButton = ({ clickAction, name }) => (
            <Button
                variant="contained"
                style={{padding: '3rem', margin: '3rem'}}
                onClick = {clickAction}
            >
                {name}
            </Button>
        )
        const counter = this.state.counter;
        console.log(counter) // eslint-disable-line
        const displayedText = () => {
            if (this.state.observationQuestions.length !== 0) {
                return (
                    <div>
                        <Typography variant='h1'>
                            {this.state.observationQuestions.find(function(question) {
                                return question.position === counter;
                            }).name}
                        </Typography>
                    </div>
                    // ^^^ Finds the question with the position 1
                )
            }
        }
        if (this.state.observationQuestions.length === 0) {
            return null;
        }
        else if (this.state.counter > this.state.observationQuestions.length) {
            this.submitObservation()
            return (<div>
                Kiitos palautteesta!
            </div>)
        }
        else {
            return (
                <div>
                    <div>{displayedText()}</div>
                    <TestButton clickAction = {() => this.clickHandler('Kyllä')} name = "Kyllä" />
                    <TestButton clickAction = {() => this.clickHandler('Ei')} name = "Ei" />
                </div>
            )
        }
    }
}

export default App