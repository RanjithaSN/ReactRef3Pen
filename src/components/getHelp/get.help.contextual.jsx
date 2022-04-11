import { UpdateIsBenifyDistributionChannel } from '@selfcare/core/redux/settings/settings.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GetHelp from './get.help';
import { RetrieveHelpContent, SetShowInaccountHelpList } from '../../redux/getHelp/get.help.actions';
import { ShowInaccountHelpList } from '../../redux/getHelp/get.help.selectors';

const mapStateToProps = createStructuredSelector({
  showInaccountHelpList: ShowInaccountHelpList
});
const mapActionsToProps = {
  retrieveHelpContent: RetrieveHelpContent,
  updateIsBenifyDistributionChannel: UpdateIsBenifyDistributionChannel,
  setShowInaccountHelpList: SetShowInaccountHelpList
};
export default connect(mapStateToProps, mapActionsToProps)(GetHelp);
