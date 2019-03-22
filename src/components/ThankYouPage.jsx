import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';

const style = {
    basic: {
        overflow: 'hidden',
        fontFamily: 'Roboto',
    },
    thankYouDiv: {
        backgroundColor: '#0496FF',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        color: '#ffffff',
        minHeight: 200,
        width: '98%',
        textAlign: 'center',
        fontSize: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    body: {
        backgroundColor: '#0078CC',
        height: '100vh',
    },
};

const ThankYouPage = () => (
    <Grid
        container
        justify="center"
        alignItems="center"
        style={style.body}>
        <Grid style={style.basic}>
            <div style={style.thankYouDiv} >
                <h2 variant="h2">
                    <FormattedMessage id="thankyou.phrase"
                        defaultMessage="Thank you for the feedback!"
                        description="Thank you text on thank you page"
                        values={{ what: 'react-intl' }}
                    />
                </h2>
            </div>
        </Grid>

    </Grid>
);

export default ThankYouPage;
