import React from 'react';
import { FormattedMessage } from 'react-intl';

const style = {
    basic: {
        backgroundColor: '#0078CC',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'Roboto',
    },
    thankYouDiv: {
        backgroundColor: '#0496FF',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        color: '#ffffff',
        height: 184,
        width: 1000,
        textAlign: 'center',
        fontSize: 40,
        marginTop: 450,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}

const ThankYouPage = () => (
    <div style={style.basic}>
        <div style={style.thankYouDiv} >
            <h2 variant="h2">
                <FormattedMessage id="thankyou.phrase"
                    defaultMessage="Thank you for the feedback!"
                    description="Thank you text on thank you page"
                    values={{ what: 'react-intl' }}
                />
            </h2>
        </div>


    </div>
);

export default ThankYouPage;
