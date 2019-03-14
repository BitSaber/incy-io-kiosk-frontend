import { connect } from 'react-redux';
import FreeText from '../components/FreeText'
import { onTextChangeAction, resetTextAction } from '../actions/UiActions'

const mapStateToProps = state => {
    return {
        text: state.ui.freeText.text,
    }
};

const mapDispatchToProps = dispatch => ({
    handleChange: event => dispatch(
        onTextChangeAction(event.target.value)
    ),
    resetText: resetTextAction
})

export default connect(mapStateToProps, mapDispatchToProps)(FreeText);
