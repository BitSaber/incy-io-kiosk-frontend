import { setAllAnsweredAction, setShowErrorAction, setErrorMsgAction } from '../actions/flagActions';
import { connect } from 'react-redux';

import { addAnswerAction, resetAnswersAction, removeAnswerAction } from '../actions/answerActions';
import { setQuestionsAction, setCurrentQuestionAction, addShownQuestionAction, removeShownQuestionAction, resetShownQuestionsAction } from '../actions/questionActions';
import { setCategoryAction, setPlaceAction } from '../actions/contextActions';
import { resetTextAction, progressUpdateAction, onTextChangeAction } from '../actions/UiActions';
import { getAllChoicesAction, setSelectedChoicesAction } from '../actions/choiceActions';
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
    removeAnswer: removeAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
    setCategory: setCategoryAction,
    setPlace: setPlaceAction,
    setAllAnswered: setAllAnsweredAction,
    setShowError: setShowErrorAction,
    setErrorMsg: setErrorMsgAction,
    setCurrentQuestion: setCurrentQuestionAction,
    setSelectedChoices: setSelectedChoicesAction,
    addShownQuestion: addShownQuestionAction,
    removeShownQuestion: removeShownQuestionAction,
    resetShownQuestions: resetShownQuestionsAction,
    getAllChoices: getAllChoicesAction,
    resetText: resetTextAction,
    textChange: onTextChangeAction,
    progressUpdate: progressUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
