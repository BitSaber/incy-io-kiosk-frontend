import { connect } from 'react-redux';

import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setQuestionsAction, setCurrentQuestionAction } from '../actions/questionActions';
import { setFunfactsAction } from '../actions/funfactsActions';
import App from '../App';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
    funfacts: state.funfacts,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
    setFunfacts: setFunfactsAction,
    setCurrentQuestion: setCurrentQuestionAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
