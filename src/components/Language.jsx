import React from 'react'
import Button from '@material-ui/core/Button';

const Language = ({ languages, onClick }) => {
    if (languages) {
        return (
            <div>
                {languages.map(language => (
                    <Button key={language} onClick={onClick} variant="contained" color="secondary">{language}</Button>
                ))}
            </div>
        );
    } else {
        return null;
    }
}

export default Language;
