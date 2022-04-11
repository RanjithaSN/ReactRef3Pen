import Immutable from 'seamless-immutable';
import LoadingStatus from '../../constants/loading.status';
import { FaultTypes } from '../fault/fault.actions';
import { SavedCartTypes } from './saved.cart.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  savedCartStatus: LoadingStatus.UNLOADED,
  isClearingSavedCart: false
});

export default function CartReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SavedCartTypes.RETRIEVE_SAVED_CART.BEGIN:
  case SavedCartTypes.RETRIEVE_SAVED_OFFERING_CART.BEGIN:
    return state.set('savedCartStatus', LoadingStatus.LOADING);
  case SavedCartTypes.SAVE_PRODUCT_CART.BEGIN:
  case SavedCartTypes.SAVE_OFFERING_CART.BEGIN:
    return state.set('savedCartStatus', LoadingStatus.UPDATING);
  case SavedCartTypes.RETRIEVE_SAVED_CART.SUCCESS:
  case SavedCartTypes.RETRIEVE_SAVED_OFFERING_CART.SUCCESS:
    return state
      .set('savedCartStatus', LoadingStatus.LOADED)
      .set('data', payload);
  case SavedCartTypes.SAVE_PRODUCT_CART.SUCCESS:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return state
      .set('savedCartStatus', LoadingStatus.UPDATED)
      .set('data', payload);
  case SavedCartTypes.CLEAR_SAVED_CART.BEGIN:
    return state.set('isClearingSavedCart', true);
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
    return state
      .set('savedCartStatus', LoadingStatus.UNLOADED)
      .set('isClearingSavedCart', false)
      .set('data', INITIAL_STATE.data);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SavedCartTypes.RETRIEVE_SAVED_CART.BEGIN:
    case SavedCartTypes.RETRIEVE_SAVED_OFFERING_CART.SUCCESS:
      return state.set('savedCartStatus', LoadingStatus.UNLOADED);
    case SavedCartTypes.SAVE_PRODUCT_CART.BEGIN:
    case SavedCartTypes.SAVE_OFFERING_CART.BEGIN:
      return state.set('savedCartStatus', LoadingStatus.UNCOMMITTED);
    case SavedCartTypes.CLEAR_SAVED_CART.BEGIN:
      return state.set('isClearingSavedCart', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
