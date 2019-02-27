import React from 'react'
// import Button from '@material-ui/core/Button';
// import questionService from '../service'
// import App from '../App'

// not sure why const
// const changeLanguage = (langId,langName) => {
//     questionService.patchLang(langId,langName)
// }

const Language = ({ languages, onLangClick } ) => {
    if (languages) {
        return (
            <div>
                <span><img src="/flags/uk.png" alt="Eng" onClick={() => onLangClick('en')} /></span>
                <span><img src="/flags/fi.png" alt="Fi" onClick={() => onLangClick('fi')} /></span>
                <span><img src="/flags/swe.png" alt="Swe" onClick={() => onLangClick('sv')} /></span>
            </div>
        );
    }

}

export default Language;
