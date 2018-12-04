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

  async componentDidMount() {
    const questions = await questionService.GetQuestion();
    this.setState({
      observationQuestions: questions
    });

    const choices = await questionService.GetChoices(this.state.currentQuestionId);
    this.setState({
      questionsChoices: choices
    })
  }

  clickChoices = () => {
    questionService.GetChoices(this.state.currentQuestionId).then((choices) => {
      this.setState({
        questionsChoices: choices
      })
    })
  }

  clickHandler = (answer) => {
    const count = this.state.counter
    const obsAns = this.state.observationAnswer
    this.setState ({
      counter: count + 1,
      observationAnswer: [...obsAns].concat(answer),
      currentQuestionId: this.state.observationQuestions.find(function(question) {
        return question.position === count + 1;
      }).id
    })
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
    } else {
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