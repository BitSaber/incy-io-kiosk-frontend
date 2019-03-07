import { connect } from 'react-redux';

import App from '../App';
import { setQuestionsAction, setCurrentQuestionAction } from '../actions/questionActions';
import { addAnswerAction, resetAnswersAction } from '../actions/answerActions';
import { setChoicesAction } from '../actions/choiceActions';

const mapStateToProps = state => ({
    currentLanguageId: state.intl.locale,
    answers: state.answers,
    questions: state.questions,
    choices: state.choices,
});

const mapDispatchToProps = {
    addAnswer: addAnswerAction,
    resetAnswers: resetAnswersAction,
    setQuestions: setQuestionsAction,
    setCurrentQuestion: setCurrentQuestionAction,
    setCurrentChoices: setChoicesAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
