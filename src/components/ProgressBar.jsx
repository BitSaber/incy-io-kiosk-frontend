import React from 'react';
import { number, shape, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
    },
    bar: {
        height: 18,
        background: '#0078CC',
    },
};

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        progress: number.isRequired,
        classes: shape({
            root: string.isRequired,
            bar: string.isRequired,
        }),
    }

    render() {
        const { classes, progress } = this.props;
        return (
            <div className={classes.root}>
                <LinearProgress variant="determinate"
                    value={progress}
                    className={classes.bar}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ProgressBar);
