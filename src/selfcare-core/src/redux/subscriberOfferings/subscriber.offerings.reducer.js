import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SubscriberOfferingsTypes } from './subscriber.offerings.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isCreating: false,
  isLoading: false
});

export default function SubscriberOfferingsReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SubscriberOfferingsTypes.RetrieveSubscriberOfferings.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case SubscriberOfferingsTypes.RetrieveSubscriberOfferings.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SubscriberOfferingsTypes.RetrieveSubscriberOfferings.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
