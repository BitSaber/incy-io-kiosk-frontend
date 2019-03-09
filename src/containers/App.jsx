import { setAllAnsweredAction, setAllDisplayedAction } from '../actions/flagActions';
import { connect } from 'react-redux';

import App from '../App';
import { setQuestionsAction, setCurrentQuestionAction } from '../actions/questionActions';
import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setChoicesAction } from '../actions/choiceActions';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
    flags: state.flags,
    choices: state.choices,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
    setAllAnswered: setAllAnsweredAction,
    setAllDisplayed: setAllDisplayedAction,
    setCurrentQuestion: setCurrentQuestionAction,
    setCurrentChoices: setChoicesAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
