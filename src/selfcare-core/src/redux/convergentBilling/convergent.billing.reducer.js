import { combineReducers } from 'redux';
import accountDetails from '../convergentBillerAccountDetails/convergent.biller.account.details.reducer';
import usageDetails from '../convergentBillerAccountUsageDetails/convergent.biller.account.usage.details.reducer';
import accountInfo from '../convergentBillerSummary/convergent.biller.summary.reducer';

export default combineReducers({
  accountInfo,
  accountDetails,
  usageDetails
});
