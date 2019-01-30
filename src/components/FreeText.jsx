import React from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import BigButton from '../components/BigButton';
import handleTextClick from '../App';

export default class FreeText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    static propTypes = {
        question: PropTypes.object.isRequired,
        onChoiceClick: PropTypes.func.isRequired
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    render() {

        return (
            <div>
                <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img> </div>
                <div className="question-div ">
                    <h2 className="txt" variant="h2">{this.props.question.name}</h2>
                </div>

                <div>
                    <div className="center-align txt">
                        <form>
                            <TextField
                                id="outlined-bare"
                                label="Please add text here"
                                multiline
                                rows="20"
                                margin="normal"
                                value={this.state.value}
                                onChange={this.handleChange}
                                variant="outlined"
                                style={{ width: 1000 }}
                            />
                        </form>
                    </div>
                </div>
                <div>
                    <div className="center-align txt">
                        <Grid container direction="row" justify="center">
                            <BigButton
                                onClick={() => this.props.onChoiceClick(this.state.value)}
                                text="Submit"
                            />
                            ))
                        </Grid>
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

            </div>
        )
    }

}