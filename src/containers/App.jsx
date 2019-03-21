import { setAllAnsweredAction, setShowErrorAction, setErrorMsgAction } from '../actions/flagActions';
import { connect } from 'react-redux';

import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setQuestionsAction, setCurrentQuestionAction } from '../actions/questionActions';
import { setCategoryAction, setPlaceAction } from '../actions/contextActions';
import { resetTextAction, progressUpdateAction } from '../actions/UiActions';
import { setCurrentChoicesAction, getAllChoicesAction } from '../actions/choiceActions';
import App from '../components/App';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
    context: state.context,
    flags: state.flags,
    choices: state.choices,
    loadingStates: state.loadingStates,
    progress: state.ui.progress,
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
    getAllChoices: getAllChoicesAction,
    setCurrentChoices: setCurrentChoicesAction,
    resetText: resetTextAction,
    progressUpdate: progressUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
