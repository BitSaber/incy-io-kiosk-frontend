import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextField } from '@material-ui/core';
import { string, func } from 'prop-types';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';



const style = {
    textDiv: {
        width: 500,
        backgroundColor: '#ffffff',
        fontWeight: 'bold',
        borderRadius: 30,
        border: 'none',
        paddingLeft: 30,
        paddingRight: 30,
    },
};

export default class FreeText extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: string.isRequired,
        handleChange: func.isRequired,
        resetText: func.isRequired,
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="center-align txt">
                <form>
                    <TextField
                        id="bare"
                        label={label}
                        multiline
                        rows="20"
                        margin="normal"
                        placeholder="Placeholder"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={this.props.text}
                        onChange={this.props.handleChange}
                        InputProps={{ disableUnderline: true }}
                        style={style.textDiv}
                    />
                </form>
            </div>
        );
    }
}
