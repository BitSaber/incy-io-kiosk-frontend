import { connect } from 'react-redux';
import QuestionPage from '../components/QuestionPage';
import { addAnswerAction, skipAnswerAction } from '../actions/answerActions';
import { setSelectedChoicesAction } from '../actions/choiceActions';
import { resetTextAction } from '../actions/UiActions';


const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    text: state.ui.freeText.text,
    error: state.flags.error,
    questionChoices: state.choices.questionChoices,
    selectedChoices: state.choices.selectedChoices,
    currentQuestion: state.questions.currentQuestion,
    questions: state.questions,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    skipAnswer: skipAnswerAction,
    setSelectedChoices: setSelectedChoicesAction,
    resetText: resetTextAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
