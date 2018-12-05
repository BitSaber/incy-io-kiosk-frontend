import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import questionService from './service'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css'
import Button from '@material-ui/core/Button'

const TestButton = ({ clickAction, name }) => (
  <Button variant="contained"  style={{padding: '3rem', margin: '3rem'}} onClick = {clickAction} >{name}</Button>
)


const initialState = {
  counter: 1,
  currentQuestionId: 5090,
  observationQuestions: [],
  questionsChoices: [],
  observationAnswer: []
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1,
      currentQuestionId: 0,
      observationQuestions: [],
      questionsChoices: [],
      observationAnswer: []
    }
  }

  initilizeState = (id) => {
    questionService.GetQuestion().then((questions) => {
      this.setState({
        observationQuestions: questions
      })
    })
    questionService.GetChoices(id).then((choices) => {
      this.setState({
        questionsChoices: choices
      })
    })
  }

  async componentDidMount() {

    const questions = await questionService.GetQuestion();
    const count = this.state.counter
    const newId = questions.find(function(question) {
      return question.position === count;
    }).id

    this.setState({
      observationQuestions: questions,
      currentQuestionId: newId
    });

    await this.clickChoices(newId)
  }

  clickChoices = (id) => {
    questionService.GetChoices(id).then((choices) => {
      this.setState({
        questionsChoices: choices
      })
    })
  }

  handleSubmit = () => {
    const ids = this.state.observationAnswer
    axios.post('https://app-staging.incy.io/api/bitsaber-staging/observations', {ids})
    .then(res => {
      console.log(res)
      console.log(res.data)
    })
  }

  async clickHandler(answer) {

    const count = this.state.counter
    const length = this.state.observationQuestions.length
    const queId = (this.state.observationQuestions.find(function(question) {
      return question.position === ((count) % length) + 1;
    }).id)
    this.clickChoices(queId)
    const obsAns = this.state.observationAnswer

    this.setState({
      counter: count + 1,
      observationAnswer: [...obsAns].concat(answer),
      currentQuestionId: queId
    })
    console.log(queId)

  }

  submitObservation = () => {
    const initialID = this.state.currentQuestionId
    this.handleSubmit()
    setTimeout(() => {
      this.setState(initialState)
      this.initilizeState(initialID)
    }, 3000)
  }

  render () {
    const counter = this.state.counter;
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
    }
    else if (this.state.counter > this.state.observationQuestions.length){
      this.submitObservation()
      return <div>
        Kiitos palautteesta!
      </div>
    }
    else {
    return (
      <div>
        <div>{displayedText()}</div> {this.state.questionsChoices.map( questionsChoice => <TestButton clickAction = {() => this.clickHandler(questionsChoice.name)} name = {questionsChoice.name} />)}
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