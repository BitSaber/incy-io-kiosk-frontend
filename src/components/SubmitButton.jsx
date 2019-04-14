import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';

// '#c6ad94', 2 '#bcad9c', '#a89a8b'
const style = {
    buttonStyle: {
        backgroundColor: '#a89a8b',
        justifyContent: 'center',
        width: 300,
        height: 70,
        margin: 8,
        borderRadius: 30,

    },
    textStyle: {
        fontSize: 35,
        color: '#ffffff',
        fontWeight: 'bold',
    },
};

const SubmitButton = ({ onClick }) => {
    return (
        <Button variant="contained" style={style.buttonStyle} onClick={onClick}>
            <Typography style={style.textStyle}><FormattedMessage id="submitbutton"
                defaultMessage="Submit"
                description="Submit button text"
                values={{ what: 'react-intl' }}
            /></Typography>
        </Button>
    );
};

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
