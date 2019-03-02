import { setLocaleAction } from '../actions/intlActions';
import { connect } from 'react-redux';
import Language from '../components/Language';

const mapDispatchToProps = {
    setLocale: setLocaleAction
}

export default connect(null, mapDispatchToProps)(Language);
