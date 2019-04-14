import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const style = {
    basic: {
        overflow: 'hidden',
        fontFamily: 'Roboto',
        fontSize: 40,
    },
    labelDiv: {
        backgroundColor: '#0496FF',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        color: '#ffffff',
        minHeight: 200,
        width: '98%',
        textAlign: 'center',
        minFontSize: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    body: {
        backgroundColor: '#0078CC',
        height: '100vh',
    },
};

const TextLabelPage = ({intl_id}) => (
    <Grid
        container
        justify="center"
        alignItems="center"
        style={style.body}>
        <Grid style={style.basic}>
            <div style={style.labelDiv} >
                <h2 variant="h2">
                    <FormattedMessage id={intl_id}
                        defaultMessage=""
                        description=""
                        values={{ what: 'react-intl' }}
                    />
                </h2>
            </div>
        </Grid>

    </Grid>
);

TextLabelPage.propTypes = {
    intl_id: PropTypes.string.isRequired,
};

export default TextLabelPage;
