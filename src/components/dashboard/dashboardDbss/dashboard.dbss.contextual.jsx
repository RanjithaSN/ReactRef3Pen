import { RetrieveConvergentBillerSummary } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import { DoConvergentBillerSummaryNeedRefreshed } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.selectors';
import { FetchMessages } from '@selfcare/core/redux/messages/messages.actions';
import { SubscriberFirstName } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RetrieveUserAccountInformation } from '../../../redux/account/account.actions';
import { HasPennyPlayProduct } from '../../../redux/products/products.selectors';
import { ShouldShowOTTGuidedExperience } from '../../../redux/site/site.selectors';
import DashboardDbss from './dashboard.dbss';

const mapStateToProps = createStructuredSelector({
  accountsNeedRefreshed: DoConvergentBillerSummaryNeedRefreshed,
  hasPennyPlayProduct: HasPennyPlayProduct,
  shouldShowOTTGuidedExperience: ShouldShowOTTGuidedExperience,
  subscriberFirstName: SubscriberFirstName
});

const mapActionsToProps = {
  fetchMessages: FetchMessages,
  retrieveAccountInformation: RetrieveUserAccountInformation,
  retrieveConvergentBillerSummary: RetrieveConvergentBillerSummary
};

export default connect(mapStateToProps, mapActionsToProps)(DashboardDbss);
