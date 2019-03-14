import { connect } from 'react-redux';
import QuestionPage from '../components/QuestionPage';
import { addAnswerAction } from '../actions/answerActions';
import { setSelectedChoicesAction } from '../actions/choiceActions';


const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    text: state.ui.freeText.text,
    error: state.flags.error,
    selectedChoices: state.choices.selectedChoices,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    setSelectedChoices: setSelectedChoicesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
