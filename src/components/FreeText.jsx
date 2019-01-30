import React from 'react';
import { TextField } from '@material-ui/core';

export default class FreeText extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

render () {

    return (
        <form>
            <TextField
                id = "standard-full-width"
                label ="Please add text here" 
                value = {this.state.value}
                onChange = {this.handleChange}
                variant = "outlined"
                style={{ margin: 100 }}
            />
        </form>
    )
}

}