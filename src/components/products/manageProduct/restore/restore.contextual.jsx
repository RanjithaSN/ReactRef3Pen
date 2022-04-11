import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrieveSubscriberOffers } from '@selfcare/core/redux/feasibility/feasibility.actions';
import { UpdatePurchasedOfferingContext } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { SearchOrders } from '@selfcare/core/redux/searchOrders/search.orders.actions';
import { ClearSubmittedOrderData } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Restore from './restore';
import { BroadbandAttributes } from '../../../../redux/orderFlow/attributes/attributes.order.flow.selectors';
import { ToggleDecisionCartUpdate } from '../../../../redux/orderFlow/offeringContext/offering.context.actions';
import { UpdateAttributesForPurchase } from '../../../../redux/orderFlow/order.flow.actions';
import { FilterOutPrimaryDecisionsForActiveContext, UpdatedQuotesForDecision } from '../../../../redux/ordering/ordering.selectors';
import { UnpauseProductAfterRenewal, UnpauseProductBeforeRenewal } from '../../../../redux/products/products.actions';
import { IsHandlingProductAction, SelectedProduct } from '../../../../redux/products/products.selectors';
import { OpenChangeOfServiceOrderExists } from '../../../../redux/searchOrders/search.orders.selectors';
import { RefreshSubscriberOfferings } from '../../../../redux/subscriberOfferings/subscriber.offerings.actions';
import { SubscriberAvailableOffers } from 'selfcare-core/src/redux/feasibility/feasibility.selectors';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  broadbandAttributesObject: BroadbandAttributes,
  filteredDecisions: FilterOutPrimaryDecisionsForActiveContext,
  isHandlingProductAction: IsHandlingProductAction,
  openChangeOfServiceOrderExists: OpenChangeOfServiceOrderExists,
  selectedLocale: SelectedLocale,
  selectedProduct: SelectedProduct,
  updatedQuotesForDecision: UpdatedQuotesForDecision,
  feasilityOffers: SubscriberAvailableOffers
});

const mapActionsToProps = {
  clearOrderData: ClearSubmittedOrderData,
  retrieveAvailableOffers: RetrieveSubscriberOffers,
  retrieveOfferingContext: UpdatePurchasedOfferingContext,
  searchOrders: SearchOrders,
  unpauseProductAfterRenewal: UnpauseProductAfterRenewal,
  unpauseProductBeforeRenewal: UnpauseProductBeforeRenewal,
  refreshOffers: RefreshSubscriberOfferings,
  toggleDecisionCartUpdate: ToggleDecisionCartUpdate,
  updateAttributesForPurchase: UpdateAttributesForPurchase
};

export default connect(mapStateToProps, mapActionsToProps)(Restore);
