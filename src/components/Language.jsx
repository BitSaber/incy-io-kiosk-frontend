import React from 'react'
import Button from '@material-ui/core/Button';
import questionService from '../service'

// not sure why const
const changeLanguage = (langId,langName) => {
    questionService.patchLang(langId,langName)
}

const Language = ({ languages }) => {
    if (languages) {
        return (
            <div>
                <span><img src="/flags/uk.png" alt="Eng" onClick={() => changeLanguage('en','English')} /></span>
                <span><img src="/flags/fi.png" alt="Fi" onClick={() => changeLanguage('fi','suomi')} /></span>
                <span><img src="/flags/swe.png" alt="Swe" onClick={() => changeLanguage('sv','svenska')} /></span>
            </div>
        );
    } else {
        return null;
    }
}

export default Language;
