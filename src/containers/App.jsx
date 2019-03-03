import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setQuestionsAction } from '../actions/questionActions';
import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
