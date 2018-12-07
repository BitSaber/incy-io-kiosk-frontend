import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types'


class BigButton extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired
    }
    render() {
        const ButtonContainer = styled.div`
          padding: 3rem;
          margin: 3rem;
        `;

        const TextContainer = styled.div`
          padding: 3rem;
          margin: 3rem;
        `;
        return (
            <ButtonContainer>
                <Button variant="contained" onClick={this.props.onClick}>
                    <TextContainer>{this.props.text}</TextContainer>
                </Button>
            </ButtonContainer>
        )
    }
}

export default BigButton;
