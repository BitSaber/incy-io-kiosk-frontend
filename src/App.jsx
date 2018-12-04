import React, { Component } from 'react';
import './css/style.css';

const element = <button className="myButton">Yes</button>
const element1 = <button className="myButton1" onClick={ActionLink}>No</button>
const question = <h1>Were you satisfied with the room?</h1>  // Insert the API question here

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            // Insert API answers
            <body>

                <div className="center-align">
                    <div className="txt" >
                        {question}
                    </div>

                    <div>
                        {element}
                        {element1}
                    </div>

                </div>

            </body>
        )


    }


}

function ActionLink(event) {
    event.currentTarget.style.backgroundColor = '#ccc';

}


export default App
