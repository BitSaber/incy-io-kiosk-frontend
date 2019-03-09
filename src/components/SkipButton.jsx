import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

const styles = {
    buttonStyle: {
        backgroundColor: '#0496FF',
        width: 600,
        fontSize: 35,
        color: '#ffffff',
        borderRadius: 30,
    }
}

const SkipButton = ({ onClick }) => (
    <Button style={styles.buttonStyle} variant="contained" onClick={onClick}>
        <FormattedMessage id="skipbutton"
            defaultMessage="Skip"
            description="Skip button text"
            values={{ what: 'react-intl' }}
        />
    </Button>
);

SkipButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default SkipButton;
