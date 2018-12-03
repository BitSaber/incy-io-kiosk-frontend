import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Hello world</p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));