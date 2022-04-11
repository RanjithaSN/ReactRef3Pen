import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RehydrateSavedOrder } from '../../../redux/cart/cart.actions';
import { CartItemCount } from '../../../redux/cart/cart.selectors';
import CartPreview from './cart.preview';

const mapStateToProps = createStructuredSelector({
  quantitiy: CartItemCount
});
const mapActionsToProps = {
  retrieveSavedCart: RehydrateSavedOrder
};

export default connect(mapStateToProps, mapActionsToProps)(CartPreview);
