import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const style = {
    buttonStyle: {
        width: 900,
        backgroundColor: '#0496FF',
        height: 100,
        borderRadius: 30,
    },
    textStyle: {
        fontSize: 35,
        color: '#ffffff',
        fontWeight: 'bold',
    },

}

const BigButton = ({ onClick, text }) => {
    return (
        <Grid item xs={12} md={12} xl={12} >
            <Button style={style.buttonStyle} variant="contained" onClick={onClick}>
                <Typography style={style.textStyle}>{text}</Typography>
            </Button>
        </Grid >
    )
};

BigButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default BigButton;
