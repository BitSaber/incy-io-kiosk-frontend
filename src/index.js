import React from 'react';
import ReactDOM from 'react-dom'
//import GetQuestions from './service';


const Button = ({ klikki, nimi }) => (
  <button onClick = {klikki} >{nimi}</button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      question: "Who let the dogs out?"
    }
  }

  onClick = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  render () {

    const kysymys = () => {
      if ((this.state.hyva) === 0) {
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
        <Button klikki = {this.onClick} nimi = "GET" />
        <div>{kysymys()}</div>
      </div>
    )
  }
}

export default App
ReactDOM.render(<App />, document.getElementById('root'));