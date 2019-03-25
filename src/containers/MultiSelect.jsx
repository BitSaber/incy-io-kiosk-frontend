import { connect } from 'react-redux';
import MultiSelect from '../components/MultiSelect';
import { setSelectedChoicesAction } from '../actions/choiceActions';

const mapStateToProps = state => ({
    selectedChoices: state.choices.selectedChoices,
});

const mapDispatchToProps = {
    setSelectedChoices: setSelectedChoicesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelect);
