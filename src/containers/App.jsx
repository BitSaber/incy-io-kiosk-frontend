import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { freetextAction } from '../actions/freetextActions'
import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    text: state.text
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    sendAnswer: freetextAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
