import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import '../css/style.css';
import { FormattedMessage } from 'react-intl';
import { ButtonContainer, TextContainer } from './BigButton';

const SubmitButton = ({ onClick }) => {
    return (
        <ButtonContainer>
            <Button className="specialButton" variant="contained" onClick={onClick}>
                <TextContainer>
                    <FormattedMessage id="submitbutton"
                        defaultMessage="Submit"
                        description="Submit button text"
                        values={{ what: 'react-intl' }}
                    />
                </TextContainer>
            </Button>
        </ButtonContainer>
    )
}

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubmitButton;