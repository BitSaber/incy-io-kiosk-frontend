import { setAllAnsweredAction, setAllDisplayedAction } from '../actions/flagActions';
import { connect } from 'react-redux';

import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setQuestionsAction, setCurrentQuestionAction } from '../actions/questionActions';
import { setCategoryAction, setPlaceAction } from '../actions/contextActions';
import { setAvailableChoicesAction } from '../actions/choiceActions';
import App from '../components/App';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
    context: state.context,
    flags: state.flags,
    choices: state.choices,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
    setCategory: setCategoryAction,
    setPlace: setPlaceAction,
    setAllAnswered: setAllAnsweredAction,
    setAllDisplayed: setAllDisplayedAction,
    setCurrentQuestion: setCurrentQuestionAction,
    setAvailableChoices: setAvailableChoicesAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
