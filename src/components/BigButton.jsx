import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  padding: 3rem;
  margin: 3rem;
`;

const TextContainer = styled.div`
  padding: 3rem;
  margin: 3rem;
`;

const BigButton = ({ onClick, text }) => (
  <ButtonContainer>
    <Button variant="contained" onClick={onClick}>
      <TextContainer>{text}</TextContainer>
    </Button>
  </ButtonContainer>
);

export default BigButton;
