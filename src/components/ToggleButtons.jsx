import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const styles = ({
    button: {
        background: '#055679',
        height: '100%',
        padding: '55px 60px',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold'
    },

    toggleContainer: {
        margin: '10px',
        borderRadius: '4px'
    }
});

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
            <ToggleButtonGroup className={this.props.classes.toggleContainer} value={formats} onChange={this.handleFormat}>
                <ToggleButton className={this.props.classes.button}
                    key={this.props.choice.id}
                    value={this.props.choice.id}>
                    <h3>{this.props.choice.name}</h3>
                </ToggleButton>
            </ToggleButtonGroup>
        );
    }
}

ToggleButtons.propTypes = {
    choice: PropTypes.object.isRequired,
    onChoiceClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToggleButtons);
