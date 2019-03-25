import { connect } from 'react-redux';
import QuestionPage from '../components/QuestionPage';
import { addAnswerAction, skipAnswerAction } from '../actions/answerActions';
import { setSelectedChoicesAction } from '../actions/choiceActions';


const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    text: state.ui.freeText.text,
    error: state.flags.error,
    questionChoices: state.choices.questionChoices,
    selectedChoices: state.choices.selectedChoices,
    currentQuestion: state.questions.currentQuestion,
    allQuestions: state.questions.allQuestions,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    skipAnswer: skipAnswerAction,
    setSelectedChoices: setSelectedChoicesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
