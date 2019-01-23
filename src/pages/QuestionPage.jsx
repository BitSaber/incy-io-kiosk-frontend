import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'

import BigButton from '../components/BigButton';
import '../css/style.css';


class QuestionPage extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        questionChoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChoiceClick: PropTypes.func.isRequired,
        questionType: PropTypes.string.isRequired
    }

    renderButton = (qType,choice) => {
        console.log(qType)
        switch(qType) {
            case 'select':
                return <BigButton  
                            key={choice.id}
                            onClick={() => this.props.onChoiceClick(choice)}
                            text={choice.name}
                        />;
            case 'multi-select':
                return <BigButton  
                            key={choice.id}
                            onClick={() => this.props.onChoiceClick(choice)}
                            text={''}
                        />;
            default: 
                return null;
        }
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
                                this.renderButton(this.props.questionType,questionsChoice)))
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
