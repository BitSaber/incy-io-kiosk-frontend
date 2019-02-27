import React from 'react';
import {FormattedMessage} from 'react-intl';

// TODO: attributes of class txt should be implemented with material UI
const ThankYouPage = () => (
    <div>
        <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img> </div>
        <div className="answer-div">
            <h2 className="txt" variant="h2">
                <FormattedMessage id="thankyou.phrase"
                    defaultMessage="Thank you for the feedback!"
                    description="Thank you text on thank you page"
                    values={{ what: 'react-intl' }}
                />
            </h2>
        </div>

        <footer className="footer">
            <footer className="inside">
                <p>Copyright © 2018 BitSaber, Otaniemi, Finland</p>
                <div className="under">
                    <ul>
                        <li> <a href="https://github.com/BitSaber/incy-io-kiosk-frontend" target="_blank" rel="noopener noreferrer">GitHub</a> </li>
                    </ul>
                </div>
            </footer>
        </footer>

    </div>
);

export default ThankYouPage;
