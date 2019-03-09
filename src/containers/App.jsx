import { connect } from 'react-redux';

import App from '../App';
import { setQuestionsAction, setCurrentQuestionAction } from '../actions/questionActions';
import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
    setCurrentQuestion: setCurrentQuestionAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
