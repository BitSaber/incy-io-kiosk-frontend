import React from 'react';
import { number, shape, string, oneOfType } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    bar: {
        height: 32,
        backgroundColor: '#0078CC',
    },
};

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // XXX: Mega-hack. Current version of LinearProgress does not support
        // what we are about to do
        // so if we have specified barColor, insert CSS for it
        if(['string', 'number'].indexOf(typeof this.props.barColor) !== -1)
            document.styleSheets[document.styleSheets.length-1]
                .addRule('#linearProgressBar01 div',
                    'background-color: '+this.props.barColor+' !important');
    }

    static propTypes = {
        progress: number.isRequired,
        classes: shape({
            bar: string.isRequired,
        }),
        barColor: oneOfType([
            string,
            number,
        ]),
    }

    render() {

        const { classes, progress } = this.props;
        return (
            <div className={classes.root}>
                <LinearProgress variant="determinate"
                    value={progress}
                    className={classes.bar}
                    id={'linearProgressBar01'}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ProgressBar);
