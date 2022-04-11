import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrieveSubscriberOffers } from '@selfcare/core/redux/feasibility/feasibility.actions';
import { UpdatePurchasedOfferingContext } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { SearchOrders } from '@selfcare/core/redux/searchOrders/search.orders.actions';
import { SearchOrdersIsLoading } from '@selfcare/core/redux/searchOrders/search.orders.selectors';
import { ClearSubmittedOrderData } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SubscriberAndAccountsIsLoaded } from '../../../../redux/account/account.selectors';
import { SubmitOrder } from '../../../../redux/checkout/checkout.actions';
import { BroadbandAttributes } from '../../../../redux/orderFlow/attributes/attributes.order.flow.selectors';
import { ToggleDecisionCartUpdate } from '../../../../redux/orderFlow/offeringContext/offering.context.actions';
import { UpdateAttributesForPurchase } from '../../../../redux/orderFlow/order.flow.actions';
import { FilterOutPrimaryDecisionsForActiveContext, UpdatedQuotesForDecision } from '../../../../redux/ordering/ordering.selectors';
import { UnpauseProductAfterRenewal } from '../../../../redux/products/products.actions';
import { IsHandlingProductAction, SelectedProduct } from '../../../../redux/products/products.selectors';
import { OpenChangeOfServiceOrderExists } from '../../../../redux/searchOrders/search.orders.selectors';
import { RefreshSubscriberOfferings } from '../../../../redux/subscriberOfferings/subscriber.offerings.actions';
import { RecentlyClosedPortInRequest, RecentlyNewOrOpenPortInRequest } from '../../../../redux/supportRequest/support.request.selectors';
import { SetContextPageData } from '../../../../redux/inAccountHelp/in.accounthelp.actions';
import { SubscriberAvailableOffers } from 'selfcare-core/src/redux/feasibility/feasibility.selectors';
import MakeChange from './make.change';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  broadbandAttributesObject: BroadbandAttributes,
  filteredDecisions: FilterOutPrimaryDecisionsForActiveContext,
  isHandlingProductAction: IsHandlingProductAction,
  isLoadingOrders: SearchOrdersIsLoading,
  isSubscriberAndAccountsLoaded: SubscriberAndAccountsIsLoaded,
  openChangeOfServiceOrderExists: OpenChangeOfServiceOrderExists,
  recentlyClosedPortInRequest: RecentlyClosedPortInRequest,
  recentlyNewOrOpenPortInRequest: RecentlyNewOrOpenPortInRequest,
  selectedLocale: SelectedLocale,
  selectedProduct: SelectedProduct,
  updateQuotesForDecision: UpdatedQuotesForDecision,
  feasilityOffers: SubscriberAvailableOffers
});

const mapActionsToProps = {
  clearOrderData: ClearSubmittedOrderData,
  refreshOffers: RefreshSubscriberOfferings,
  retrieveAvailableOffers: RetrieveSubscriberOffers,
  retrieveOfferingContext: UpdatePurchasedOfferingContext,
  searchOrders: SearchOrders,
  submitOrder: SubmitOrder,
  unpauseProductAfterRenewal: UnpauseProductAfterRenewal,
  toggleDecisionCartUpdate: ToggleDecisionCartUpdate,
  updateAttributesForPurchase: UpdateAttributesForPurchase,
  setContextPageData: SetContextPageData
};

export default connect(mapStateToProps, mapActionsToProps)(MakeChange);
