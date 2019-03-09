import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import '../css/style.css';
import { FormattedMessage } from 'react-intl';
import { ButtonContainer } from './BigButton'

export const SkipContainer = styled.div`
    padding:20px 10px;
    margin:5px;
    color: #ffffff;
    font-size:18px;
    font-weight:bold;
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SkipButton = ({ onClick }) => (
    <ButtonContainer>
        <Button className="specialButton" variant="contained" onClick={onClick}>
            <SkipContainer>
                <FormattedMessage id="skipbutton"
                    defaultMessage="Skip"
                    description="Skip button text"
                    values={{ what: 'react-intl' }}
                />
            </SkipContainer>
        </Button>
    </ButtonContainer>
);


SkipButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};



export default SkipButton;
