import GetHelpActionButton from './get.help.action.button';
import { RetrieveHelpContent, SetShowInaccountHelpList, GetArticles } from '../../../redux/getHelp/get.help.actions';
import { connect } from 'react-redux';

const mapStateToProps = () => ({});

const mapActionsToProps = {
  retrieveHelpContent: RetrieveHelpContent,
  setShowInaccountHelpList: SetShowInaccountHelpList,
  getArticles: GetArticles
};

export default connect(mapStateToProps, mapActionsToProps)(GetHelpActionButton);
