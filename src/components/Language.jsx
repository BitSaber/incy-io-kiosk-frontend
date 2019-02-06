import React from 'react'
import Button from '@material-ui/core/Button';
import questionService from '../service'

// not sure why const
const changeLanguage = (langId) => {
    questionService.patchLang(langId)
}

const Language = ({ languages }) => {
    if (languages) {
        return (
            <div>
                <button><img src="./assets/flags/uk.png" alt="Eng" onClick={() => changeLanguage('en')} /></button>
                <button><img src="./assets/flags/fi.png" alt="Fi" onClick={() => changeLanguage('fi')} /></button>
                <button><img src="./assets/flags/swe.png" alt="Swe" onClick={() => changeLanguage('sv')} /></button>
            </div>
        );
    } else {
        return null;
    }
}

export default Language;
