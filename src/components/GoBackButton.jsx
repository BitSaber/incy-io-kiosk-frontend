import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const style = {
    buttonStyle: {
        backgroundColor: '#0496FF',
        width: 300,
        height: 70,
        fontSize: 35,
        color: '#ffffff',
        borderRadius: 30,
        fontWeight: 'bold',
    },
};

const GoBackButton = ({ onClick }) => (
    <Button style={style.buttonStyle} variant="contained" onClick={onClick}>
        <FormattedMessage id="gobackbutton"
            defaultMessage="Go Back"
            description="Previous page text"
            values={{ what: 'react-intl' }}
        />
    </Button>
);

GoBackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
