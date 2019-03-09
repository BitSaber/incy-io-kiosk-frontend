import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'
import BigButton from '../components/BigButton';
import SkipButton from '../components/SkipButton';
import SubmitButton from '../components/SubmitButton'
import Language from '../containers/Language';
import ToggleButtons from '../components/ToggleButtons';
import { FormattedMessage } from 'react-intl';

import {
    SELECT,
    MULTI_SELECT,
    STR,
    UNINITIALIZED as QUESTION_TYPE_UNINITIALIZED
} from '../constants/questionTypes';

const styles = {
    basic: {
        backgroundColor: '#0078CC',
        height: '100vh',
        overflow: 'hidden',
        alignItems: 'center',
        fontFamily: 'Roboto',
    },
    textStyle: {
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold',
    },
    questionDiv: {
        backgroundColor: '#0496FF',
        display: 'flex',
        justifyContent: 'center',
        height: 184,
        textAlign: 'center',
        margin: 138,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 45,
    },
    middleDiv: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 450,
    },
    bottomDiv: {



    }
}

class QuestionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '' // current text of the textField
        };
    }

    static propTypes = {
        question: PropTypes.object.isRequired,
        questionChoices: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChoiceClick: PropTypes.func.isRequired,
        questionType: PropTypes.string.isRequired,
        onSubmitMultiClick: PropTypes.func.isRequired,
        onSubmitFreeText: PropTypes.func.isRequired,
        questionPos: PropTypes.number.isRequired,
        error: PropTypes.bool,
        skipClick: PropTypes.func.isRequired,
        currentIsRequired: PropTypes.bool.isRequired
    }

    submitMultiButton = () => {
        return <SubmitButton onClick={() => this.props.onSubmitMultiClick()} />
    }

    renderSelect = () => {
        return this.props.questionChoices.map(questionsChoice => (
            <BigButton
                key={questionsChoice.id}
                onClick={() => this.props.onChoiceClick(questionsChoice)}
                text={questionsChoice.name}
            />
        ))
    }

    renderMultiselect = () => {
        return this.props.questionChoices.map(choice => (
            <ToggleButtons key={choice.id} choice={choice} onChoiceClick={this.props.onChoiceClick} />
        ))
    }

    //Updates changes made into textfield into state
    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    renderTextField = () => {
        const label = (<FormattedMessage id="textfield.placeholder"
            defaultMessage="Your answer"
            description="Placeholder on text field"
            values={{ what: 'react-intl' }}
        />);

        return (
            <div className="center-align txt">
                <form>
                    <TextField
                        id="outlined-bare"
                        label={label}
                        multiline
                        rows="20"
                        margin="normal"
                        value={this.state.text}
                        onChange={this.handleChange}
                        variant="outlined"
                        style={{ width: 500 }}
                    />
                </form>
            </div>
        )
    }

    renderQuestionElements = (questionType) => {
        if (questionType === SELECT) {
            return this.renderSelect()
        } else if (questionType === MULTI_SELECT) {
            return this.renderMultiselect()
        } else if (questionType === STR) {
            return this.renderTextField()
        } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
            return null;
        } else {
            throw `Invalid Question type '${questionType}'`
        }
    }

    submitTextButton = () => {
        return ( // XXX: does not render for some reason
            <SubmitButton
                onClick={() => {
                    this.props.onSubmitFreeText(this.state.text)
                    this.setState({
                        text: ''
                    });
                }}
                text="Submit"
            />
        )
    }

    questionHasSubmitButton = (questionType) => {
        const questionsWithSubmitButtons = [
            MULTI_SELECT,
            STR,
        ]
        return questionsWithSubmitButtons.indexOf(questionType) !== -1;
    }

    renderSubmitButton = (questionType) => {
        if (!this.questionHasSubmitButton(questionType)) {
            return null
        } else if (questionType === MULTI_SELECT) {
            return this.submitMultiButton()
        } else if (questionType === STR) {
            return this.submitTextButton()
        } else if (questionType === QUESTION_TYPE_UNINITIALIZED) {
            return (<div>Loading, please wait...</div>)
        } else {
            throw `Invalid Question type '${questionType}'`
        }
    }

    renderLanguageButtons = () => {
        if (this.props.questionPos === 0) {
            return <Language />
        }
        return
    }


    render() {

        return (
            <div style={styles.basic}>

                <Grid container
                    alignItems="center"
                    style={styles.questionDiv}>


                    <Typography style={styles.textStyle}> {this.props.question.name}</Typography>
                    {this.props.error && <Typography variant='h4' color='error'>
                        <FormattedMessage id="questionpage.required"
                            defaultMessage="This field is required!"
                            description="Requirement text"
                            values={{ what: 'react-intl' }}
                        />
                    </Typography>}

                </Grid>

                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center" style={styles.middleDiv}>
                    <Grid item xs={12}>
                        {this.renderQuestionElements(this.props.questionType)}
                    </Grid>
                </Grid>

                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center" style={styles.bottomDiv}>
                    <Grid item xs={12}>
                        {this.renderSubmitButton(this.props.questionType)}
                        {
                            !this.props.currentIsRequired &&
                            <SkipButton
                                onClick={() => this.props.skipClick()}
                                text={"Skip"}
                            />
                        }
                        {this.renderLanguageButtons()}
                    </Grid>
                </Grid>



            </div>
        )
    }
}

export default QuestionPage;
