import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'

import BigButton from '../components/BigButton';
import SkipButton from '../components/SkipButton';
import '../css/style.css';


class QuestionPage extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        questionChoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChoiceClick: PropTypes.func.isRequired,
        skipClick: PropTypes.func.isRequired,
        currentIsRequired: PropTypes.bool.isRequired
    }


    render() { //TODO: attributes of class txt should be implemented with material UI
        return (
            <div>
                <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img> </div>
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
                    <div className="skipped">
                      { // TODO: button location and style
                          !this.props.currentIsRequired &&
                              <SkipButton
                                  onClick={() => this.props.skipClick()}
                                  text={"Skip"}
                                  />
                      }
                    </div>

                </div>
                <footer className="footer">
                    <footer className="inside">
                        <p>Copyright © 2018 BitSaber, Otaniemi, Finland</p>
                    </footer>
                </footer>

            </div>


        )
    }
}

export default QuestionPage;
