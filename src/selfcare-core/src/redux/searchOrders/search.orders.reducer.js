import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SearchOrdersTypes } from './search.orders.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export default function SearchOrdersReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SearchOrdersTypes.SearchOrders.BEGIN:
    return state
      .set('isLoading', true);
  case SearchOrdersTypes.SearchOrders.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SearchOrdersTypes.SearchOrders.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
