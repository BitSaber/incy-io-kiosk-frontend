import { connect } from 'react-redux';
import Select from '../components/Select';
import { addAnswerAction } from '../actions/answerActions';
import { setSelectedChoicesAction } from '../actions/choiceActions';


const mapStateToProps = state => ({
    currentQuestion: state.questions.currentQuestion,
    selectedChoices: state.choices.selectedChoices,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    setSelectedChoices: setSelectedChoicesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
