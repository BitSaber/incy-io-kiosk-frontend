import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl';


const style = {
    buttonStyle: {
        width: 750,
        backgroundColor: '#0496FF',
        justifyContent: 'center',
        height: 65,
        borderRadius: 30,

    },
    textStyle: {
        fontSize: 35,
        color: '#ffffff',
        fontWeight: 'bold',
    },
}

const SubmitButton = ({ onClick }) => {
    return (
        <Button variant="contained" style={style.buttonStyle} onClick={onClick}>
            <FormattedMessage id="submitbutton"
                defaultMessage="Submit"
                description="Submit button text"
                values={{ what: 'react-intl' }}
            />
        </Button>
    )
}

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
