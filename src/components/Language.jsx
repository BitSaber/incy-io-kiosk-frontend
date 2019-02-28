import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { setLocaleAction } from '../actions/intlActions';

const Language = ({ setLocale }) => {
    return (
        <div>
            <span><img src="/flags/uk.png" alt="Eng" onClick={() => {setLocale('en')}} /></span>
            <span><img src="/flags/fi.png" alt="Fi" onClick={() => {setLocale('fi')}} /></span>
            <span><img src="/flags/swe.png" alt="Swe" onClick={() => {setLocale('sv')}} /></span>
        </div>
    );
}

Language.propTypes = {
    setLocale: func.isRequired
}

const mapDispatchToProps = {
    setLocale: setLocaleAction
}

export default connect(
    null,
    mapDispatchToProps
)(Language);
