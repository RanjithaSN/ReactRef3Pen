import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CartItemCount } from '../../../redux/cart/cart.selectors';
import CartIconWithBadge from './cart.icon.with.badge';


const mapStateToProps = createStructuredSelector({
  quantity: CartItemCount
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(CartIconWithBadge);
