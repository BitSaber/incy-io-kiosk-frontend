import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { getQuestionsAction } from '../actions/questionActions';
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
    getQuestions: getQuestionsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
