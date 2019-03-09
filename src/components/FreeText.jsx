import React from 'react'
import { FormattedMessage } from 'react-intl';
import { TextField } from '@material-ui/core';
import { string } from 'prop-types'

export default class FreeText extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: string.isRequired
    }

    static label = (<FormattedMessage id="textfield.placeholder"
        defaultMessage="Your answer"
        description="Placeholder on text field"
        values={{ what: 'react-intl' }}
    />);

    render() {
        return (
            <div className="center-align txt">
                <form>
                    <TextField
                        id="outlined-bare"
                        label={this.label}
                        multiline
                        rows="20"
                        margin="normal"
                        value={this.props.text}
                        onChange={this.props.handleChange}
                        variant="outlined"
                        style={{ width: 500 }}
                    />
                </form>
            </div>
        )
    };
}

