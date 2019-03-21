import React from 'react';

import { TextField } from '@material-ui/core';
import { string, func } from 'prop-types';
import Grid from '@material-ui/core/Grid';

const style = {
    textDiv: {
        width: 500,
        backgroundColor: '#0496FF',
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



        return (
            <Grid >
                <form>
                    <TextField
                        id="bare"
                        multiline
                        rows="10"
                        margin="normal"
                        value={this.props.text}
                        onChange={this.props.handleChange}
                        InputProps={{ disableUnderline: true, style: { fontSize: 30, color: '#ffffff', hover: '#ffffff' } }}
                        style={style.textDiv}
                    />
                </form>
            </Grid>
        );
    }
}
