import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SubscriberTypes } from './subscriber.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  edit: null,
  isDeleting: false,
  isLoaded: false,
  isLoading: false,
  isUpdating: false
});

export default function SubscriberReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SubscriberTypes.RetrieveSubscriber.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case SubscriberTypes.RetrieveSubscriber.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoaded', true)
      .set('isLoading', false);
  case SubscriberTypes.UpdateSubscriber.BEGIN:
    return state
      .set('isUpdating', true);
  case SubscriberTypes.UpdateSubscriber.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoaded', true)
      .set('isUpdating', false);
  case SubscriberTypes.UpdateCredentials.BEGIN:
    return state
      .set('isUpdating', true);
  case SubscriberTypes.UpdateCredentials.SUCCESS:
    return state
      .set('isUpdating', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SubscriberTypes.RetrieveSubscriber.BEGIN:
      return state.set('isLoading', false);
    case SubscriberTypes.UpdateCredentials.BEGIN:
      return state.set('isUpdating', false);
    case SubscriberTypes.UpdateSubscriber.BEGIN:
      return state.set('isUpdating', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
