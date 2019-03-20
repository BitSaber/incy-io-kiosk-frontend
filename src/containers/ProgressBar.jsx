import { connect } from 'react-redux';
import ProgressBar from '../components/ProgressBar';
import { progressUpdateAction } from '../actions/UiActions';

const mapStateToProps = state => {
    return {
        progress: state.ui.progress,
    };
};

const mapDispatchToProps = () => ({
    progressUpdate: progressUpdateAction,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
