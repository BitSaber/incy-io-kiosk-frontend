import { connect } from 'react-redux';
import FreeText from '../components/FreeText';
import { onTextChangeAction, resetTextAction } from '../actions/UiActions';
import { addAnswerAction } from '../actions/answerActions';

const mapStateToProps = state => ({
    text: state.ui.freeText.text,
    questions: state.questions,
});

const mapDispatchToProps = ({
    onTextChange: onTextChangeAction,
    resetText: resetTextAction,
    addAnswer: addAnswerAction,
});

export default connect(mapStateToProps, mapDispatchToProps)(FreeText);
