import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'

import BigButton from '../components/BigButton';
import '../css/style.css';
import Language from '../components/Language';


class QuestionPage extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        questionChoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChoiceClick: PropTypes.func.isRequired,
        languages: PropTypes.array.isRequired,
    }


    render() { //TODO: attributes of class txt should be implemented with material UI
        return (
            <div>
                <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img>
                    <Language languages={this.props.languages} />
                </div>
                <div className="question-div ">
                    <Typography class="txt" variant="h2">{this.props.question.name}</Typography>
                </div>

                <div>
                    <div className="center-align txt">
                        <Grid container direction="row" justify="center">
                            {this.props.questionChoices.map(questionsChoice => (
                                <BigButton
                                    key={questionsChoice.id}
                                    onClick={() => this.props.onChoiceClick(questionsChoice)}
                                    text={questionsChoice.name}
                                />
                            ))
                            }
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

export default QuestionPage;
