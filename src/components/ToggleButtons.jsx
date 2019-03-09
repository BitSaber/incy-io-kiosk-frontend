import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { Typography } from '@material-ui/core';

const style = {
    buttonStyle: {
        width: 900,
        backgroundColor: '#0496FF',
        marginTop: 13.5,
        marginBottom: 15,
        height: 75,
        borderRadius: 30,
    },
    textStyle: {
        fontSize: 35,
        color: '#ffffff',
        fontWeight: 'bold',
        justifyContent: 'center'
    },

}

class ToggleButtons extends React.Component {

    state = {
        formats: []
    };

    handleFormat = (event, formats) => {
        this.props.onChoiceClick(this.props.choice)
        this.setState({ formats })
    }

    render() {
        const { formats } = this.state;
        return (

            <ToggleButtonGroup style={style.buttonStyle} value={formats} onChange={this.handleFormat}>
                <ToggleButton style={style.buttonStyle}
                    key={this.props.choice.id}
                    value={this.props.choice.id}>
                    <Typography style={style.textStyle}>{this.props.choice.name}</Typography>
                </ToggleButton>
            </ToggleButtonGroup>

        );
    }
}

ToggleButtons.propTypes = {
    choice: PropTypes.object.isRequired,
    onChoiceClick: PropTypes.func.isRequired,
};

export default ToggleButtons;
