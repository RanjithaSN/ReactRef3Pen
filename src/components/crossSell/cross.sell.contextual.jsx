import CrossSell from './cross.sell';
import { CrossSellProducts } from '../../redux/products/products.selectors';
import { CreateCartForPlayPurchase } from '../../redux/orderFlow/order.flow.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  crossSellProducts: CrossSellProducts
});
const mapActionsToProps = {
  purchasePlay: CreateCartForPlayPurchase
};

export default connect(mapStateToProps, mapActionsToProps)(CrossSell);
