import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextField } from '@material-ui/core';
import { string, func } from 'prop-types';

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
    }

    render() {

        const label = (
            <FormattedMessage id="textfield.placeholder"
                defaultMessage="Your answer"
                description="Placeholder on text field"
                values={{ what: 'react-intl' }}
            />
        );

        return (
            <div className="center-align txt">
                <form>
                    <TextField
                        id="bare"
                        label={label}
                        multiline
                        rows="20"
                        margin="normal"
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

