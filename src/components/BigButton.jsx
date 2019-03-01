import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import '../css/style.css';

/* Used also in SubmitButton */
export const TextContainer = styled.div`
    padding:20px 10px;
    margin:5px;
    color: #ffffff;
    font-size:18px;
    font-weight:bold;
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonContainer = styled.div`
    margin:8px;
`;

const BigButton = ({ onClick, text }) => {
    return (
        <ButtonContainer>
            <Button className="newButton" variant="contained" onClick={onClick}>
                <TextContainer>{text}</TextContainer>
            </Button>
        </ButtonContainer>
    )
};


BigButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};



export default BigButton;
