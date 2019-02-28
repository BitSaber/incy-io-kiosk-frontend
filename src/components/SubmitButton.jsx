import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import '../css/style.css';
import { FormattedMessage } from 'react-intl';

export const SubmitContainer = styled.div`
padding:20px 10px;
  margin:5px;
  text-shadow:0px 0px 0px #005667;
  color: #ffffff;
  font-size:18px;
  font-weight:bold;
  width: 200px;
  height: 100px;
  border: 0px solid #000000;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const ButtonContainer = styled.div`
    margin:8px;
`;

const SubmitButton = ({ onClick }) => {
    return (
        <ButtonContainer>
            <Button className="submitButton" variant="contained" onClick={onClick}>
                <SubmitContainer>
                    <FormattedMessage id="bigbutton.submit"
                        defaultMessage="Submit"
                        description="Submit button text"
                        values={{ what: 'react-intl' }}
                    />
                </SubmitContainer>
            </Button>
        </ButtonContainer>
    )
}

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubmitButton;