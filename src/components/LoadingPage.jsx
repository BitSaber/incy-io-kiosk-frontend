import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { object, number, string, oneOfType} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const style = {
    body: {
        maxHeight: '3000px',
        backgroundColor: '#0078CC',
        display: 'block',
        height: '120vh',
    },
};

const styles = theme => ({ // eslint-disable-line
    progress: {
        marginTop: 'calc(50vh - ('+theme.spacing.unit * 18.75 +'px / 2))',
    },
});

function LoadingPage(props) {
    const { classes } = props;
    // XXX: Mega-hack. Current version of LinearProgress does not support
    // what we are about to do:
    // if we have specified barColor, insert CSS for it, given that we haven't
    // aleady done this hack
    const styleElId = 'haxed-loading-circle-color';
    if(document.querySelectorAll(`#${styleElId}`).length < 1
        && ['string', 'number'].indexOf(typeof this.props.circleColor) !== -1) {
        const style = document.createElement('style');
        style.setAttribute('id', 'haxed-loading-circle-color');
        style.innerHTML = '#circularProgressBar01 div { background-color: '+this.props.circleColor+' !important }';
        document.head.appendChild(style);
    }
    return (
        <div style={style.body}>
            <CircularProgress
                className={classes.progress}
                color='primary'
                size={150}
                id={'circularProgressBar01'}
            />
        </div>
    );
}

LoadingPage.propTypes = {
    classes: object.isRequired,
    circleColor: oneOfType([
        string,
        number,
    ]),
};

export default withStyles(styles)(LoadingPage);
