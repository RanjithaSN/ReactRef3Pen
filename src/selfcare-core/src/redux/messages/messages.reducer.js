import path from 'ramda/src/path';
import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { MessagesTypes } from './messages.actions';

export const INITIAL_STATE = new Immutable({
  data: {
    messages: null
  },
  isLoaded: false,
  isLoading: false
});

export default function MessagesReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case MessagesTypes.FETCH_MESSAGES.BEGIN:
    return state
      .set('isLoading', true)
      .set('isLoaded', false)
      .setIn(['data', 'messages'], null);
  case MessagesTypes.FETCH_MESSAGES.SUCCESS:
    return state
      .setIn(['data', 'messages'], path(['Notifications'], payload))
      .set('isLoading', false)
      .set('isLoaded', true);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case MessagesTypes.FETCH_MESSAGES.BEGIN:
      return state
        .setIn(['data', 'messages'], null)
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
