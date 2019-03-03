import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
