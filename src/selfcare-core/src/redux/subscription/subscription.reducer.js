import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SubscriptionTypes } from './subscription.actions';

const EMPTY_OBJECT = Immutable({});

export const INITIAL_STATE = new Immutable({
  subscriptions: EMPTY_OBJECT,
  loaded: EMPTY_OBJECT,
  loading: EMPTY_OBJECT,
  updating: EMPTY_OBJECT
});

export default function SubscriptionReducer(state = INITIAL_STATE, { payload = {}, type, requestObject }) {
  switch (type) {
  case SubscriptionTypes.RetrieveSubscription.BEGIN:
    return state.setIn(['loading', requestObject.Id], true)
      .setIn(['loaded', requestObject.Id], false);
  case SubscriptionTypes.RetrieveSubscription.SUCCESS:
    return state
      .setIn(['loading', requestObject.Id], false)
      .setIn(['loaded', requestObject.Id], true)
      .setIn(['subscriptions', requestObject.Id], payload.Subscription);
  case SubscriptionTypes.UpdateSubscription.BEGIN:
    return state.setIn(['updating', requestObject.Id], true);
  case SubscriptionTypes.UpdateSubscription.SUCCESS:
    return state
      .setIn(['updating', requestObject.Id], false)
      .setIn(['subscriptions', requestObject.Id], payload.Subscription);
  case SubscriptionTypes.ClearSubscriptions:
    return INITIAL_STATE;
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SubscriptionTypes.RetrieveSubscription.BEGIN:
      return state.setIn(['loading', requestObject.Id], false);
    case SubscriptionTypes.UpdateSubscription.BEGIN:
      return state.setIn(['updating', requestObject.Id], false);
    default:
      return state;
    }
  default:
    return state;
  }
}
