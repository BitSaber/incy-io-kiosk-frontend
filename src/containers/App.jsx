import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setQuestionsAction } from '../actions/questionActions';
import { setFunfactsAction } from '../actions/funfactsActions';
import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
    place: state.funfacts.place,
    category: state.funfacts.category
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
    setFunfacts: setFunfactsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
