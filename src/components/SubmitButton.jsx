import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import '../css/style.css';
import { FormattedMessage } from 'react-intl';
import { ButtonContainer, TextContainer } from './BigButton';

const style = {
    buttonStyle: {
        width: 750,
        backgroundColor: '#0496FF',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 13.5,
        marginBottom: 15,
        height: 100,
        borderRadius: 30,
        marginRight: 20,
    },
    textStyle: {
        fontSize: 35,
        fontFamily: "Roboto",
        color: '#ffffff',
    },
}

const SubmitButton = ({ onClick }) => {
    return (
        <ButtonContainer style={style.buttonStyle}>
            <Button variant="contained" onClick={onClick}>
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
