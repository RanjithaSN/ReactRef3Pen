import GetHelpSearch from './get.help.search';
import { ClearSearchResults, RetrieveSearchResults } from '../../../redux/aws/cloudSearch/cloud.search.actions';
import { CloudSearchIsLoading, CloudSearchResults } from '../../../redux/aws/cloudSearch/cloud.search.selectors';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import { ShowInaccountHelpList } from '../../../redux/getHelp/get.help.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  isLoadingSearchResults: CloudSearchIsLoading,
  searchResults: CloudSearchResults,
  showInaccountHelpList: ShowInaccountHelpList
});

const mapActionsToProps = {
  clearSearchResults: ClearSearchResults,
  navigateInHelp: NavigateInHelp,
  retrieveSearchResults: RetrieveSearchResults
};

export default connect(mapStateToProps, mapActionsToProps)(GetHelpSearch);
