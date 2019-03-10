import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const buttonStyle = (isSelected) => ({
    width: '90%',
    backgroundColor: isSelected ? '#4cb4ff' : '#0496FF',
    height: 100,
    borderRadius: 30,
    margin: 'auto'
});

const textStyle = {
    fontSize: 35,
    color: '#ffffff',
    fontWeight: 'bold',
}

class MultiSelect extends React.Component {
    render() {
        const selectedChoiceIds = this.props.multiSelectArray.map(selection => selection.id);

        return (
            <>
            {this.props.choices.map(choice => {
                const isSelected = selectedChoiceIds.includes(choice.id);
                return (
                    <Grid item xs={12} md={12} xl={12} key={choice.id}>
                        <Button variant={isSelected ? 'contained' : 'text'} style={buttonStyle(isSelected)} onClick={() => this.props.onChoiceClick(choice)}>
                            <Typography style={textStyle}>{choice.name}</Typography>
                        </Button>
                    </Grid>
                )
            })}
            </>
        );
    }
}

MultiSelect.propTypes = {
    choices: PropTypes.array.isRequired,
    onChoiceClick: PropTypes.func.isRequired,
    multiSelectArray: PropTypes.array.isRequired,
};

export default MultiSelect;
