import React from 'react';

import { TextField } from '@material-ui/core';
import { string, func, shape } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { injectIntl } from 'react-intl';

const style = {
    textDiv: {
        width: '95%',
        maxWidth: 500,
        backgroundColor: '#0496FF',
        fontWeight: 'bold',
        borderRadius: 30,
        border: 'none',
        paddingLeft: 30,
        paddingRight: 30,
    },
};

class FreeText extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: string.isRequired,
        handleChange: func.isRequired,
        resetText: func.isRequired,
        intl: shape({
            formatMessage: func.isRequired,
        }).isRequired,
    }

    render() {
        const placeholder = this.props.intl.formatMessage({id: "textfield.placeholder"});
        return (
            <Grid >
                <form>
                    <TextField
                        id="bare"
                        multiline
                        rows="10"
                        margin="normal"
                        value={this.props.text}
                        placeholder={placeholder}
                        onChange={this.props.handleChange}
                        InputProps={{ disableUnderline: true, style: { fontSize: 30, color: '#ffffff', hover: '#ffffff' } }}
                        style={style.textDiv}
                    />
                </form>
            </Grid>
        );
    }
}

export default injectIntl(FreeText);
