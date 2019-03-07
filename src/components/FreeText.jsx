import React from 'react'
import { FormattedMessage } from 'react-intl';
import { TextField } from '@material-ui/core';



const label = (<FormattedMessage id="textfield.placeholder"
    defaultMessage="Your answer"
    description="Placeholder on text field"
    values={{ what: 'react-intl' }}
/>);

class FreeText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '' // current text of the textField
        };
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <div className="center-align txt">
                <form>
                    <TextField
                        id="outlined-bare"
                        label={label}
                        multiline
                        rows="20"
                        margin="normal"
                        value={this.state.text}
                        onChange={this.handleChange}
                        variant="outlined"
                        style={{ width: 500 }}
                    />
                </form>
            </div>
        )
    };
}

