import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { connect } from 'react-redux';
import App from '../App';

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
}

export default connect(null, mapDispatchToProps)(App);
