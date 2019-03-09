import { connect } from 'react-redux';
import QuestionPage from '../pages/QuestionPage'

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    text: state.ui.freeText.text,
});

const mapDispatchToProps = () => {
    return {
        //onSubmitFreeText: () => dispatch(submitText())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);