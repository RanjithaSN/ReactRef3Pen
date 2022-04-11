import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SubscriberInventoryTypes } from './subscriber.inventory.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isCreating: false,
  isLoading: false
});

export default function SubscriberInventoryReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SubscriberInventoryTypes.SearchSubscriberInventory.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case SubscriberInventoryTypes.SearchSubscriberInventory.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SubscriberInventoryTypes.SearchSubscriberInventory.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
