import React from 'react';
import ReactDOM from 'react-dom';
import questionService from './service'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css'
import Button from '@material-ui/core/Button'

const TestButton = ({ clickAction, name }) => (
  <Button variant="contained"  style={{padding: '3rem', margin: '3rem'}} onClick = {clickAction} >{name}</Button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1,
      currentQuestionId: 5090,
      observationQuestions: [],
      questionsChoices: [],
      observationAnswer: []
    }
  }

  componentDidMount() {
    questionService.GetQuestion().then((questions) => {
      this.setState({
        observationQuestions: questions
      })
    })
    questionService.GetChoices().then(choices) => {
      this.setState({
        questionsChoices: choices
      })
    }
  }

  clickChoices = () => {
    questionService.GetChoices(this.state.currentId).then((choices) => {
      this.setState({
        questionsChoices: choices
      })
      console.log(this.state)
    })
  }

  clickHandler = (answer) => {
    const count = this.state.counter
    const obsAns = this.state.observationAnswer
    this.setState ({
      counter: count + 1,
      observationAnswer: [...obsAns].concat(answer)
    })
    console.log(obsAns)
  }

  render () {
    const counter = this.state.counter;
    console.log(counter)
    const displayedText = () => {
      if (this.state.observationQuestions.length !== 0) {
      return (
        <div>
          <Typography variant='h1'>
            {this.state.observationQuestions.find(function(question) {
              return question.position === counter;
            }).name}
          </Typography>
        </div> // ^^^ Finds the question with the position 1
      )
      }
    }
    if (this.state.observationQuestions.length === 0) {
      return null;
    } else {
    return (
      <div>
        <div>{displayedText()}</div>
        <TestButton clickAction = {() => this.clickHandler('Kyllä')} name = "KYLLÄ" />
        <TestButton clickAction = {() => this.clickHandler('Ei')} name = "EI" />
      </div>
    )
  }
}
}

export default App
ReactDOM.render(
<React.Fragment>
  <CssBaseline />
  <App />
</React.Fragment>, 
document.getElementById('root'));