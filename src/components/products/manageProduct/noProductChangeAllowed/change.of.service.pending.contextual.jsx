import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RecentlyClosedPortInRequest, RecentlyNewOrOpenPortInRequest } from '../../../../redux/supportRequest/support.request.selectors';
import ChangeOfServicePending from './change.of.service.pending';
import { SelectedProduct } from '../../../../redux/products/products.selectors';
import { ClearSubmittedOrderData } from '@selfcare/core/redux/submitOrder/submit.order.actions';

const mapStateToProps = createStructuredSelector({
  recentlyClosedPortInRequest: RecentlyClosedPortInRequest,
  recentlyNewOrOpenPortInRequest: RecentlyNewOrOpenPortInRequest,
  selectedProduct: SelectedProduct
});

const mapActionsToProps = {
  clearOrderData: ClearSubmittedOrderData
};

export default connect(mapStateToProps, mapActionsToProps)(ChangeOfServicePending);
