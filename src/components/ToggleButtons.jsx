import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

class ToggleButtons extends React.Component {
  state = {
    formats: [],
  };

  handleFormat = (event, formats) => this.setState({ formats });

  render() {
//    const { classes } = this.props;
    const { formats } = this.state;
    return (
        <ToggleButtonGroup value={formats} exclusive onChange={this.handleFormat}>
                <ToggleButton
                key={this.props.choice.id}
                className={this.props.choice.name}
                onClick={() => this.props.onChoiceClick}
                value={this.props.choice.name}>
                <h2>{this.props.choice.name}</h2>
                </ToggleButton>
        </ToggleButtonGroup>
    )
}
}

ToggleButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(ToggleButtons);
export default ToggleButtons;