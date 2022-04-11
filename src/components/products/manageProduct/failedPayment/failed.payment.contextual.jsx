import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IsHandlingProductAction, SelectedProduct } from '../../../../redux/products/products.selectors';
import { PaymentFailureRequestsForSelectedProduct } from '../../../../redux/supportRequest/support.request.selectors';
import FailedPayment from './failed.payment';

const mapStateToProps = createStructuredSelector({
  isHandlingProductAction: IsHandlingProductAction,
  paymentFailure: PaymentFailureRequestsForSelectedProduct,
  selectedProduct: SelectedProduct
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(FailedPayment);
