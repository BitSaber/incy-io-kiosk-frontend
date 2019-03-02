import React, { Component } from 'react';
import { func } from 'prop-types';

export default class Language extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        setLocale: func.isRequired
    }

    render() {
        const setLocale = this.props.setLocale
        return (
            <div>
                <span>
                    <img src="/flags/uk.png" alt="Eng"
                        onClick={() => {setLocale('en')}} />
                </span>
                <span>
                    <img src="/flags/fi.png" alt="Fi"
                        onClick={() => {setLocale('fi')}} />
                </span>
                <span>
                    <img src="/flags/swe.png" alt="Swe"
                        onClick={() => {setLocale('sv')}} />
                </span>
            </div>
        );
    }
}
