import GetInaccountHelp from './get.inaccount.help';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import { InaccountHelpList } from '../../../redux/getHelp/get.help.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  inaccountHelpList: InaccountHelpList
});

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp
};

export default connect(mapStateToProps, mapActionsToProps)(GetInaccountHelp);
