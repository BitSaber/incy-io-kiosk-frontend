import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { func, object, bool } from 'prop-types';

const styles = {
    root: {
        flexGrow: 1,
    },
};

export class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        progressUpdate: func.isRequired,
        progressReset: func.isRequired,
        currentQuestion: object.isRequired,
        isAllQuestionsAnswered: bool.isRequired,
    }

    /* componentDidMount() {
         this.timer = setInterval(this.progress, 500);
     }

     componentWillUnmount() {
         clearInterval(this.timer);
     }*/

    progress = () => {
        const { progressUpdate, progressReset, isAllQuestionsAnswered, currentQuestion } = this.props;
        // const currentPos = currentQuestion.position;
        if (isAllQuestionsAnswered) {
            return progressReset();
        } else {
            console.log(progressUpdate);
            progressUpdate(Math.min(2 * 10, 100));
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <LinearProgress variant="determinate" value={this.progress()} />
                <br />
                <LinearProgress color="secondary" variant="determinate" value={this.progress()} />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgressBar);
