import React from 'react';
import ReactDOM from 'react-dom'
import GetQuestion from './service'


const Button = ({ klikki, name }) => (
  <button onClick = {klikki} >{name}</button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      question: "Who let the dogs out?"
    }
  }

  clickGet = () => {
    this.setState({
      counter: this.state.counter + 1,
      question: GetQuestion()
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
      return (
        <div>{this.state.question}</div> 
      )
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