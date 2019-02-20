import React from 'react';
import {DEFAULT_LANG_ID} from './constants/defaults';
import questionService from './service'
import ThankYouPage from './pages/ThankYouPage';
import QuestionPage from './pages/QuestionPage';

const initialState = {
    questions: [],
    currentQuestionID: null,
    currentQuestionChoices: [],
    answers: {},
    isAllQuestionsAnswered: false,
    areAllQuestionsDisplayed: false,
    categoryId: null,
    placeId: null,
    languages: [],
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    async componentDidMount() {
        this.setInfo();
    }

    setInfo = async () => { // better name ideas?
        const cat = await questionService.getCategory()
        const loc = await questionService.getPlace()
        const lang = await questionService.getLanguages()

        // Sets the default language as the language, and changes it if default not included in API's languages
        var langId = DEFAULT_LANG_ID
        if (!lang.includes(DEFAULT_LANG_ID)) {
            langId = lang[0].id
        }

        // Sets the state with necessary attributes fetched from the API, and calls setFirstQuestion after
        this.setState({
            category: cat[0].id,
            place: loc[0].id,
            languages: lang.map(language => language.id),
            currentLanguageId: langId
        }, this.setFirstQuestion );
    }

    changeLanguage = async (languageId) => {
        // Sets the chosen language as the new language and returns to the first question
        await this.setState( {
            currentLanguageId: languageId
        }, this.setFirstQuestion)
    }

    setFirstQuestion = async () => {
        const questions = await questionService.getQuestions(this.state.currentLanguageId);
        const currentQuestionID = questions[0].id;
        const choices = await questionService.getChoices(currentQuestionID, this.state.currentLanguageId);
        this.setState({
            questions: questions,
            currentQuestionID: currentQuestionID,
            answers: [],
            currentQuestionChoices: choices
        });
    }

    checkNextQuestion = (position) => {
        const answerKeys = this.state.answers
        const nextQuestion = this.state.questions.find(question => question.position === position)
        if (nextQuestion.depends_on_question_id === null) {
            return true
        } else if (answerKeys[nextQuestion.depends_on_question_id] !== undefined &&
            answerKeys[nextQuestion.depends_on_question_id]["id"] === nextQuestion.depends_on_choice_id) {
            return true
        } else {
            return false
        }
    }

    setNextQuestion = async () => {
        // finds the next question to display
        const questionsLen = this.state.questions.length
        var position = this.state.questions.find(
            question => question.id === this.state.currentQuestionID).position + 1
        var flag = true
        // Loop through the questions by position, and determine if the question at hand needs to be displayed
        while (position <= questionsLen && flag) {
            if (this.checkNextQuestion(position)) {
                flag = false
                this.setQuestion(position)
            } else {
                position += 1
            }
        }
        // Check if the last displayed question still needs an answer, or if the thank you page can be displayed
        if (position >= questionsLen && !flag) {
            this.state.areAllQuestionsDisplayed = true
        } else if (position >= questionsLen && flag) {
            this.state.areAllQuestionsDisplayed = true
            this.state.isAllQuestionsAnswered = true
        }
    }

    setQuestion = async (newPosition) => {
        // Sets the question with the predetermined position as the new current question and gets the questions choices from the API.
        const newQuestionID = this.state.questions.find(question => question.position === newPosition).id
        this.setState({
            currentQuestionID: newQuestionID
        });
        const newChoices = await questionService.getChoices(newQuestionID);
        this.setState({
            currentQuestionChoices: newChoices
        })
    }


    handleChoiceClick = async (choice) => {
        await this.setState((previousState) => {
            return {
                ...previousState,
                answers: {
                    ...previousState.answers,
                    [previousState.currentQuestionID]: {
                        id: choice.id
                    }
                }
            }
        });

        const { currentQuestionID, questions } = this.state;
        const position = questions.findIndex(question => question.id === currentQuestionID);

        if (!this.state.areAllQuestionsDisplayed) { // more questions
            this.setNextQuestion(position);
            if (this.state.areAllQuestionsDisplayed && this.state.isAllQuestionsAnswered) {
                this.submitObservation()
            }
        } else { // no more questions
            this.submitObservation();
        }
    }

    submitObservation = () => {
        const time = new Date().toString().substring(0, 21)
        const place = this.state.place
        const answers = this.state.answers
        const category = this.state.category
        const data = {
            occurred_at: time,
            place: place,
            deadline: null,
            category: category,
            answers: answers
        }

        questionService.postObservation(data);

        this.setState({
            answers: {}, // prevents the previous answers from being POSTed
            isAllQuestionsAnswered: true,
        });

        this.setFirstQuestion();
        this.setCatAndLoc();

        setTimeout(() => {
            this.setState({
                isAllQuestionsAnswered: false,
                areAllQuestionsDisplayed: false
            });
        }, 3000);
    }

    render() {

        const question = this.state.questions.find(question => question.id === this.state.currentQuestionID);

        // question is undefined and we are waiting for it from the server
        if (!question) {
            return null;
        }

        if (this.state.isAllQuestionsAnswered) {
            return <ThankYouPage />;
        }

        return (
            <QuestionPage
                question={question}
                questionChoices={this.state.currentQuestionChoices}
                onChoiceClick={this.handleChoiceClick}
                languages={this.state.languages}
                onLangClick={this.changeLanguage}
            />
        );
    }
}

export default App;
