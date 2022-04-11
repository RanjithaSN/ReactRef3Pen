import { combineReducers } from 'redux';
import offeringContexts from '../offeringContext/offering.context.reducer';
import quote from '../quote/quote.reducer';
import cart from '../savedCart/saved.cart.reducer';
import submitOrder from '../submitOrder/submit.order.reducer';

export default combineReducers({
  offeringContexts,
  quote,
  submitOrder,
  cart
});
