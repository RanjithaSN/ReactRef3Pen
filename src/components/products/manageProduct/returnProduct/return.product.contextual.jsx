import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { CancelSelectedProduct } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IsHandlingProductAction, RightToReturnReasons, SelectedProduct } from '../../../../redux/products/products.selectors';
import { RefreshSubscriberOfferings } from '../../../../redux/subscriberOfferings/subscriber.offerings.actions';
import { RecentlyClosedPortInRequest, RecentlyNewOrOpenPortInRequest } from '../../../../redux/supportRequest/support.request.selectors';
import { CancelPortInRequest } from 'selfcare-core/src/redux/portIn/portin.actions';
import ReturnProduct from './return.product';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  isHandlingProductAction: IsHandlingProductAction,
  recentlyClosedPortInRequest: RecentlyClosedPortInRequest,
  recentlyNewOrOpenPortInRequest: RecentlyNewOrOpenPortInRequest,
  removalReasonOptions: RightToReturnReasons,
  selectedProduct: SelectedProduct
});

const mapActionsToProps = {
  cancelOffer: CancelSelectedProduct,
  cancelPortInRequest: CancelPortInRequest,
  refreshOffers: RefreshSubscriberOfferings
};

export default connect(mapStateToProps, mapActionsToProps)(ReturnProduct);
