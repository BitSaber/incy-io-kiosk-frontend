import { connect } from 'react-redux';
import MultiSelect from '../components/MultiSelect';
import { setSelectedChoicesAction } from '../actions/choiceActions';
import { addAnswerAction } from '../actions/answerActions';

const mapStateToProps = state => ({
    selectedChoices: state.choices.selectedChoices,
    currentQuestion: state.questions.currentQuestion,
});

const mapDispatchToProps = {
    setSelectedChoices: setSelectedChoicesAction,
    addAnswer: addAnswerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelect);
