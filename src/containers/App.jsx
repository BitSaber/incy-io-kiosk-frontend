import { setAllAnsweredAction, setShowErrorAction, setErrorMsgAction } from '../actions/flagActions';
import { connect } from 'react-redux';

import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setQuestionsAction, setCurrentQuestionAction } from '../actions/questionActions';
import { setCategoryAction, setPlaceAction } from '../actions/contextActions';
import { setAvailableChoicesAction } from '../actions/choiceActions';
import { resetTextAction } from '../actions/UiActions';
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
    setShowError: setShowErrorAction,
    setErrorMsg: setErrorMsgAction,
    setCurrentQuestion: setCurrentQuestionAction,
    setAvailableChoices: setAvailableChoicesAction,
    resetText: resetTextAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
