import { connect, dispatch } from 'react-redux';
import FreeText from '../components/FreeText'
import { onTextChangeAction } from '../actions/UiActions'

const mapStateToProps = state => ({
    text: state.ui.freeText.text
});

const handleChange = (event) => {
    dispatch(
        onTextChangeAction(event.target.value)
    );
}

const mapDispatchToProps = {
    handleChange: handleChange
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeText);
