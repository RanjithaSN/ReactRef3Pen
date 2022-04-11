import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SubscriberInformationTypes } from './subscriber.information.actions';

export const INITIAL_STATE = new Immutable({
  data: {
    ssnLookup: {},
    ssnLookupStudent: {}
  },
  isLoading: false,
  updateSubscriberLoading: false
});

export default function SubscriberInformationReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SubscriberInformationTypes.STUDENT_SSN_CHECK.BEGIN:
    return state
      .setIn(['data', 'ssnLookupStudent'], null)
      .set('isLoading', true);
  case SubscriberInformationTypes.STUDENT_SSN_CHECK.SUCCESS:
    return state
      .setIn(['data', 'ssnLookupStudent'], payload)
      .set('isLoading', false);
  case SubscriberInformationTypes.FETCH_SSN_INFORMATION.BEGIN:
    return state
      .setIn(['data', 'ssnLookup'], null)
      .set('isLoading', true);
  case SubscriberInformationTypes.FETCH_SSN_INFORMATION.SUCCESS:
    return state
      .setIn(['data', 'ssnLookup'], payload)
      .set('isLoading', false);
  case SubscriberInformationTypes.UPDATE_SUBSCRIBER_SSN_INFORMATION.BEGIN:
    return state.set('updateSubscriberLoading', true);
  case SubscriberInformationTypes.UPDATE_SUBSCRIBER_SSN_INFORMATION.SUCCESS:
    return state.set('updateSubscriberLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SubscriberInformationTypes.FETCH_SSN_INFORMATION.BEGIN:
      return state.set('isLoading', false);
    case SubscriberInformationTypes.UPDATE_SUBSCRIBER_SSN_INFORMATION.BEGIN:
      return state.set('updateSubscriberLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
