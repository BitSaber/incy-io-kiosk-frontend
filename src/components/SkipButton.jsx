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

const SkipButton = ({ onClick }) => (
    <Button style={style.buttonStyle} variant="contained" onClick={onClick}>
        <FormattedMessage id="skipbutton"
            defaultMessage="Skip"
            description="Skip button text"
            values={{ what: 'react-intl' }}
        />
    </Button>
);

SkipButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SkipButton;
