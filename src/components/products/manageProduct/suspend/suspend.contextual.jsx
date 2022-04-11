import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { SearchOrders } from '@selfcare/core/redux/searchOrders/search.orders.actions';
import { SearchSupportRequest } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PauseProductAfterPaymentFailure, PauseProductAtRenewal } from '../../../../redux/products/products.actions';
import { IsHandlingProductAction, SelectedProduct, AllProducts, HasPennyPlayProduct } from '../../../../redux/products/products.selectors';
import { OpenChangeOfServiceOrderExists } from '../../../../redux/searchOrders/search.orders.selectors';
import { RefreshSubscriberOfferings } from '../../../../redux/subscriberOfferings/subscriber.offerings.actions';
import { PaymentFailureRequestsForSelectedProduct } from '../../../../redux/supportRequest/support.request.selectors';
import Suspend from './suspend';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  isHandlingProductAction: IsHandlingProductAction,
  openChangeOfServiceOrderExists: OpenChangeOfServiceOrderExists,
  selectedProduct: SelectedProduct,
  allProducts: AllProducts,
  paymentFailure: PaymentFailureRequestsForSelectedProduct,
  selectedLocale: SelectedLocale,
  hasPennyPlayOffer: HasPennyPlayProduct
});

const mapActionsToProps = {
  pauseProduct: PauseProductAtRenewal,
  pauseProductAfterPaymentFail: PauseProductAfterPaymentFailure,
  refreshOffers: RefreshSubscriberOfferings,
  searchOrders: SearchOrders,
  searchSupportRequest: SearchSupportRequest
};

export default connect(mapStateToProps, mapActionsToProps)(Suspend);
