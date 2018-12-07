import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'

import BigButton from '../components/BigButton';

class QuestionPage extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        questionChoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChoiceClick: PropTypes.func.isRequired
    }
    render() {
        return (
            <div>
                <Typography variant='h1'>{this.props.question.name}</Typography>
                <Grid container justify="center">
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
        )
    }
}

export default QuestionPage;
