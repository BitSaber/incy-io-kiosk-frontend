import React from 'react';
import Typography from '@material-ui/core/Typography';

const ThankYouPage = () => (
    <div>
        <div className="center-align"><img src="/planblogo_color.jpg" className="logo"></img> </div>
        <div className="answer-div">
            <Typography class="txt"><h2>Kiitos vastaamisesta!</h2></Typography>
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
