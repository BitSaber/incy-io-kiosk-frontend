import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import '../css/style.css';

export const TextContainer = styled.div`
  padding:20px 10px;
  margin:5px;
  text-shadow:0px 0px 0px #005667;
  color: #ffffff;
  font-size:18px;
  font-weight:bold;
  width: 100px;
  height: 50px;
  border: 0px solid #000000;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
    margin:8px;
`;

const SkipButton = ({ onClick, text }) => (
    <ButtonContainer>
        <Button className="newButton" variant="contained" onClick={onClick}>
            <TextContainer>{text}</TextContainer>
        </Button>
    </ButtonContainer>
);


SkipButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};



export default SkipButton;
