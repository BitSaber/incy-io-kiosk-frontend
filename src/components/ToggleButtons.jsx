import React from "react";
import PropTypes from "prop-types";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";



// const styles = ({
//     button: {
//         background: '#055679',
//         height: '100%',
//         padding: '55px 60px',
//         color: '#ffffff',
//         fontSize: '16px',
//         fontWeight: 'bold'
//     },

//     toggleContainer: {
//         margin: '10px',
//         borderRadius: '4px'
//     }
// });

const style = {
    buttonStyle: {
        width: 900,
        backgroundColor: '#0496FF',
        marginTop: 13.5,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center',
        height: 100,
        borderRadius: 30,
    },
    textStyle: {
        fontSize: 35,
        fontFamily: "Roboto",
        color: '#ffffff',

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
                <ToggleButton style={style.textStyle}
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
};



export default ToggleButtons;
