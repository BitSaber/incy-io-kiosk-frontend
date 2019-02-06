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
                {languages.map(language => (
                    <Button key={language} onClick={() => changeLanguage(language)} variant="contained" color="secondary">{language}</Button>
                ))}
            </div>
        );
    } else {
        return null;
    }
}

export default Language;
