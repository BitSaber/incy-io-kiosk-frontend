import React from 'react';
import ReactDOM from 'react-dom';
import GetQuestion from './service'

const Button = ({ klikki, name }) => (
  <button onClick = {klikki} >{name}</button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      question: "Who let the dogs out?",
      observationQuestions: []
    }
  }

  clickGet = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
    GetQuestion().then((questions) => {
      console.log('mjoo', questions);
      this.setState({
        observationQuestions: questions
      })
    })
  }

  render () {

    const displayedText = () => {
      if ((this.state.counter) === 0) {
        return (
          <div>
            <em>Button not yet pushed</em>
          </div>
        )
      }
      if (this.state.observationQuestions.length !== 0) {
      return (
        <div>{this.state.observationQuestions[0].name}</div> //Should find the lowest position first (javascript.find)
      )
      }
    }

    return (
      <div>
        <Button klikki = {this.clickGet} name = "GET" />
        <div>{displayedText()}</div>
      </div>
    )
  }
}

export default App
ReactDOM.render(<App />, document.getElementById('root'));