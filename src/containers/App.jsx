import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setQuestionsAction } from '../actions/questionActions';
import { setAllAnsweredAction, setAllDisplayedAction } from '../actions/flagActions';
import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
    flags: state.flags,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
    setAllAnswered: setAllAnsweredAction,
    setAllDisplayed: setAllDisplayedAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
