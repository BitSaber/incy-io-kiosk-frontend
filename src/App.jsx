import React, { Component } from 'react';
import { GetQuestion, GetChoices } from './service'
import Typography from '@material-ui/core/Typography'
import './index.css'
import Button from '@material-ui/core/Button'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            currentId: 5090,
            observationQuestions: [],
            questionsChoices: []
        }
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

    clickChoices() {
        GetChoices(this.state.currentId).then((choices) => {
            this.setState({
                questionsChoices: choices
            })
            console.log(this.state) // eslint-disable-line
        })
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
        const displayedText = () => {
            if (this.state.counter === 0) {
                return (
                    <div>
                        <Typography variant='h1'>Button not yet pushed</Typography>
                    </div>
                )
            }
            if (this.state.observationQuestions.length !== 0) {
                return (
                    <div>
                        <Typography variant='h1'>
                            {this.state.observationQuestions.find(function(question) {
                                return question.position === 1;
                            }).name}
                        </Typography>
                    </div>
                    // ^^^ Finds the question with the position 1
                )
            }
        }
        return (
            <div>
                <div>{displayedText()}</div>
                <TestButton clickAction = {this.clickGet.bind(this)} name = "GET" />
                <TestButton clickAction = {this.clickChoices.bind(this)} name = "Choices" />
            </div>
        )
    }
}

export default App