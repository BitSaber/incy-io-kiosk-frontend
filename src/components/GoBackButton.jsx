import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';

const style = {
    buttonStyle: {
        backgroundColor: '#638aa5',
        width: 300,
        height: 70,
        fontSize: 35,
        color: '#ffffff',
        borderRadius: 30,
        fontWeight: 'bold',
        // padding: '30px',
    },
};

const GoBackButton = ({ onClick }) => (
    <Grid item xs={12} sm={6} xl={3}>
        <Button style={style.buttonStyle} variant="contained" onClick={onClick}>
            <FormattedMessage id="gobackbutton"
                defaultMessage="Go Back"
                description="Previous page text"
                values={{ what: 'react-intl' }}
            />
        </Button>
    </Grid>
);

GoBackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default GoBackButton;
