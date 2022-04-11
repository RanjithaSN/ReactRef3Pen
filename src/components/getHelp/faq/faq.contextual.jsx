import { connect } from 'react-redux';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import Faq from './faq';

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp
};

export default connect(null, mapActionsToProps)(Faq);
