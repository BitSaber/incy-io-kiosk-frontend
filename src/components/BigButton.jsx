import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import '../css/style.css';

/* Used also in SubmitButton */
export const TextContainer = styled.div`
// padding:20px 10px;
//     margin:5px;
//     color: #ffffff;
//     font-size:18px;
//     font-weight:bold;
//     width: 200px;
//     height: 100px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
`;



const style = {
    buttonStyle: {
        width: 900,
        backgroundColor: '#0496FF',
        marginTop: 13.5,
        marginBottom: 15,
        justify: 'center',
        height: 100,
        borderRadius: 30,
        fontWeight: 'bold',

    },
    textStyle: {
        fontSize: 35,
        fontFamily: "Roboto",
        color: '#ffffff',
    },

}



export const ButtonContainer = styled.div`
    margin:0px;
`;

const BigButton = ({ onClick, text }) => {
    return (
        <ButtonContainer>
            <Button style={style.buttonStyle} variant="contained" onClick={onClick}>
                <TextContainer style={style.textStyle}>{text}</TextContainer>
            </Button>
        </ButtonContainer >
    )
};


BigButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};



export default BigButton;
