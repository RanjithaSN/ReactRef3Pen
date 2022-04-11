import { combineReducers } from 'redux';
import codes from './codes/codes.reducer';
import offerings from './offerings/offerings.reducer';
import products from './products/products.reducer';

export default combineReducers({
  codes,
  offerings,
  products
});
