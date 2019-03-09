import { connect } from 'react-redux';
import QuestionPage from '../pages/QuestionPage'

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    text: state.ui.freeText.text,
    showError: state.flags.showError,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);