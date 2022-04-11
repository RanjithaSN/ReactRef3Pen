import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrievePurchasedOfferingContextForModify } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { SearchOrders } from '@selfcare/core/redux/searchOrders/search.orders.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SIMSwap from './sim.swap';
import { SubmitOrder } from '../../../../redux/checkout/checkout.actions';
import { UpdateAttributeValue } from '../../../../redux/orderFlow/attributes/attributes.order.flow.action';
import { OfferingAttributesForSimSwap } from '../../../../redux/orderFlow/attributes/attributes.order.flow.selectors';
import { DecisionCartUpdateForSimSwap } from '../../../../redux/orderFlow/offeringContext/offering.context.actions';
import { SetActiveOfferIds, UpdateCart } from '../../../../redux/orderFlow/order.flow.actions';
import { FilterOutPrimaryDecisionsForActiveContext } from '../../../../redux/ordering/ordering.selectors';
import { IsHandlingProductAction, SelectedProduct } from '../../../../redux/products/products.selectors';
import { OpenChangeOfServiceOrderExists } from '../../../../redux/searchOrders/search.orders.selectors';
import { SetContextPageData } from '../../../../redux/inAccountHelp/in.accounthelp.actions';
import { RecentlyClosedPortInRequest, RecentlyCreatedRequest, RecentlyNewOrOpenPortInRequest } from '../../../../redux/supportRequest/support.request.selectors';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  filteredDecisions: FilterOutPrimaryDecisionsForActiveContext,
  isHandlingProductAction: IsHandlingProductAction,
  openChangeOfServiceOrderExists: OpenChangeOfServiceOrderExists,
  recentlyClosedPortInRequest: RecentlyClosedPortInRequest,
  recentlyNewOrOpenPortInRequest: RecentlyNewOrOpenPortInRequest,
  recentlyCreatedRequest: RecentlyCreatedRequest,
  selectedProduct: SelectedProduct,
  simSwapAttribute: OfferingAttributesForSimSwap
});

const mapActionsToProps = {
  retrieveOfferingContextWithDecisions: RetrievePurchasedOfferingContextForModify,
  searchOrders: SearchOrders,
  setActiveOfferIds: SetActiveOfferIds,
  submitOrder: SubmitOrder,
  toggleDecisionCartUpdate: DecisionCartUpdateForSimSwap,
  updateAttributeValue: UpdateAttributeValue,
  updateCart: UpdateCart,
  setContextPageData: SetContextPageData
};

export default connect(mapStateToProps, mapActionsToProps)(SIMSwap);
