import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import '../css/style.css';
import { FormattedMessage } from 'react-intl';

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

const ButtonContainer = styled.div`
    margin:8px;
`;

const SkipButton = ({ onClick }) => (
    <ButtonContainer>
        <Button className="submitButton" variant="contained" onClick={onClick}>
            <SkipContainer>
                <FormattedMessage id="skipbutton"
                    defaultMessage="Submit"
                    description="Submit button text"
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
