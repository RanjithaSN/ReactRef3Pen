import Immutable from 'seamless-immutable';
import LOADING_STATUS from '../../../constants/loading.status';
import { FaultTypes } from '../../fault/fault.actions';
import { ProductActionTypes } from './products.actions';

export default function(state = new Immutable({}), { type, payload, requestObject }) {
  switch (type) {
  case ProductActionTypes.RETRIEVE_PRODUCT.BEGIN:
    return state.set(requestObject.id, {
      status: LOADING_STATUS.LOADING,
      product: null
    });
  case ProductActionTypes.RETRIEVE_PRODUCT.SUCCESS:
    return state.set(requestObject.id, {
      status: LOADING_STATUS.LOADED,
      product: payload.Product
    });
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ProductActionTypes.RETRIEVE_PRODUCT.BEGIN:
      return state.setIn([requestObject.id, 'status'], LOADING_STATUS.UNLOADED);
    default:
      return state;
    }
  default:
    return state;
  }
}
