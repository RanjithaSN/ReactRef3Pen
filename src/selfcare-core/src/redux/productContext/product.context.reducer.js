import Immutable from 'seamless-immutable';
import LoadingStatus from '../../constants/loading.status';
import { FaultTypes } from '../fault/fault.actions';
import { ProductOrderingTypes } from './product.context.actions';

export default (state = new Immutable({}), { type, payload, requestObject }) => {
  switch (type) {
  case ProductOrderingTypes.RetrieveSingleProductContext.BEGIN:
    return state.set(requestObject.ProductId, {
      status: LoadingStatus.LOADING
    });
  case ProductOrderingTypes.RetrieveSingleProductContext.SUCCESS:
    return state.set(requestObject.ProductId, {
      data: payload,
      status: LoadingStatus.LOADED
    });
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ProductOrderingTypes.RetrieveSingleProductContext.BEGIN:
      return state.set(requestObject.ProductId, {
        status: LoadingStatus.UNLOADED
      });
    default:
      return state;
    }
  default:
    return state;
  }
};
