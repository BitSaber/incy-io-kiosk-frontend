import React, { Component } from 'react';
import './css/style.css';
import './css/animations.css';


const element = <button className="newButton">Kyllä</button>
const element1 = <button className="newButton" >Ei</button>




class App extends Component {






    render() {

        return (
            // Insert API answers
            <div>
                <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img> </div>
                <div className="question-div ">
                    <h2 className="txt">Oletko tyytyväinen huoneen tarvikkeisiin?</h2>
                </div>

                <div>
                    <div className="center-align">
                        {element}
                        {element1}
                    </div>
                </div>
                <footer className="footer">
                    <footer className="inside">
                        <p>Copyright © 2018 BitSaber, Otaniemi, Finland</p>
                        <div className="under">
                            <ul>
                                <li> <a href="https://github.com/BitSaber/incy-io-kiosk-frontend" target="_blank" rel="noopener noreferrer">GitHub</a> </li>
                            </ul>
                        </div>
                    </footer>
                </footer>
            </div >
        )
    }
}





export default App
