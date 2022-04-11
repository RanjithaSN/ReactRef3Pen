import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MonthlyCostList, ShoppingCartMonthlyTotalsForActiveOfferingContexts } from '../../../redux/orderFlow/offeringContext/offering.context.selectors';
import { IsCalculatingDecisionBeingModified } from '../../../redux/ordering/ordering.selectors';
import OfferSummaryPreview from './offer.summary.preview';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  costList: MonthlyCostList,
  costListTotal: ShoppingCartMonthlyTotalsForActiveOfferingContexts,
  isCalculatingDecisionBeingModified: IsCalculatingDecisionBeingModified
});

export default connect(mapStateToProps, null)(OfferSummaryPreview);
