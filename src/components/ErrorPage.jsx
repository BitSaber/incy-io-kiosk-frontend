import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';

const style = {
    body: {
        backgroundColor: '#0078CC',
        height: '100vh',
    },
    errorDiv: {
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
};

function ErrorPage() {
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            style={style.body}>
            <div style={style.errorDiv} >
                <h2 variant="h2">
                    <FormattedMessage id="error.message"
                        defaultMessage="Something went wrong"
                        description="Error text if error happens when loading"
                        values={{ what: 'react-intl' }}
                    />
                </h2>
            </div>
        </Grid>
    );
}

export default ErrorPage;
