import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import BigButton from '../components/BigButton';

const QuestionPage = ({ question, questionChoices, onChoiceClick }) => (
    <div>
        <Typography variant='h1'>{question.name}</Typography>
        <Grid container justify="center">
          {questionChoices.map(questionsChoice => (
            <BigButton 
              key={questionsChoice.id} 
              onClick={() => onChoiceClick(questionsChoice)} 
              text={questionsChoice.name} 
            />
            ))
          }
        </Grid>
    </div>
);

export default QuestionPage;
