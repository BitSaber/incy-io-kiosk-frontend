import React from 'react';
import PropTypes, { number } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { func } from 'prop-types';

const styles = {
    root: {
        flexGrow: 1,
    },
    bar: {
        height: 18,
    },
};

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        progress: number.isRequired,
        progressUpdate: func.isRequired,
        progressReset: func.isRequired,
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <LinearProgress variant="determinate"
                    value={this.props.progress}
                    className={classes.bar}
                />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgressBar);
