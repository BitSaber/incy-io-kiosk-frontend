import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const style = {
    buttonStyle: {
        width: 700,
        backgroundColor: '#0496FF',
        height: 100,
        borderRadius: 30,
    },

    textStyle: {
        fontSize: 35,
        color: '#ffffff',
        fontWeight: 'bold',
    },

}

class ToggleButtons extends React.Component {

    state = {
        formats: [],
        backgroundColor: '#ffffff'
    };

    handleFormat = (event, formats) => {
        this.props.onChoiceClick(this.props.choice)
        this.setState({ formats })

    }

    render() {
        const { formats } = this.state;
        return (
            <Grid item xs={12} md={12} xl={12} >
                <ToggleButtonGroup style={style.buttonStyle} value={formats} onChange={this.handleFormat}>
                    <ToggleButton style={style.buttonStyle}
                        key={this.props.choice.id}
                        value={this.props.choice.id}>
                        <Typography style={style.textStyle}>{this.props.choice.name}</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        );
    }
}

ToggleButtons.propTypes = {
    choice: PropTypes.object.isRequired,
    onChoiceClick: PropTypes.func.isRequired,
};

export default ToggleButtons;
