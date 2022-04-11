import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GetActivationRequestForProduct } from '../../../redux/supportRequest/support.request.selectors';
import Product from './product';

const mapStateToProps = createStructuredSelector({
  getActivationRequestForProduct: GetActivationRequestForProduct
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Product);
