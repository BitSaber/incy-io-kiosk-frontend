import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { TextField } from '@material-ui/core';
import { string, func } from 'prop-types';
<<<<<<< HEAD
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


=======
import Grid from '@material-ui/core/Grid';
>>>>>>> 36ea3350457c0595334d8aeaff65eeece02eee7c

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
<<<<<<< HEAD
        const { classes } = this.props;
=======

        // const label = (
        //     <FormattedMessage id="textfield.placeholder"
        //         defaultMessage="Your answer"
        //         description="Placeholder on text field"
        //         values={{ what: 'react-intl' }}
        //     />
        // );
>>>>>>> 36ea3350457c0595334d8aeaff65eeece02eee7c

        return (
            <Grid >
                <form>
                    <TextField
                        id="bare"
                        multiline
                        rows="10"
                        margin="normal"
<<<<<<< HEAD
                        placeholder="Placeholder"
                        InputLabelProps={{
                          shrink: true,
                        }}
=======
                        placeholder="Write something nice"
>>>>>>> 36ea3350457c0595334d8aeaff65eeece02eee7c
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
