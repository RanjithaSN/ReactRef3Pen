import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { IsSubmittingOrder } from '@selfcare/core/redux/submitOrder/submit.order.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AllowanceSubmitOrder } from '../../../../redux/checkout/checkout.actions';
import { DecisionCartUpdateForAllowance } from '../../../../redux/orderFlow/offeringContext/offering.context.actions';
import { ClearOrderingData } from '../../../../redux/ordering/ordering.actions';
import { AllowanceMarketingTemplate, IsCalculatingDecisionBeingModified, UpdatedQuotesForDecision } from '../../../../redux/ordering/ordering.selectors';
import { AllowanceProduct } from '../../../../redux/products/products.selectors';
import { RefreshSubscriberOfferings } from '../../../../redux/subscriberOfferings/subscriber.offerings.actions';
import PurchaseAllowance from './purchase.allowance';

const mapStateToProps = createStructuredSelector({
  allowanceProduct: AllowanceProduct,
  apiFault: Fault,
  decisionBeingModified: IsCalculatingDecisionBeingModified,
  isSubmittingOrder: IsSubmittingOrder,
  purchasableAllowanceProduct: AllowanceMarketingTemplate,
  updatedQuotesForDecision: UpdatedQuotesForDecision
});

const mapActionsToProps = {
  allowanceCartUpdate: DecisionCartUpdateForAllowance,
  clearOrderingData: ClearOrderingData,
  refreshSubscriberOfferings: RefreshSubscriberOfferings,
  submitOrder: AllowanceSubmitOrder
};

export default connect(mapStateToProps, mapActionsToProps)(PurchaseAllowance);
