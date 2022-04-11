import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { SubscriberInformationActions } from './subscriber.information.actions';

export const INITIAL_STATE = Immutable({
  isCreating: false,
  prospect: null,
  updateError: null
});

export default function SubscriberInformationReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SubscriberInformationActions.CREATE_PROSPECT.BEGIN:
    return state.set('isCreating', true)
      .set('updateError', null);
  case SubscriberInformationActions.CREATE_PROSPECT.SUCCESS:
    return state.set('isCreating', false)
      .set('prospect', payload)
      .set('updateError', null);
  case SubscriberInformationActions.CLEAR_PROSPECT:
    return INITIAL_STATE;
  case SubscriberInformationActions.UPDATE_PROSPECT_ERROR:
    return state.set('updateError', payload);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SubscriberInformationActions.CREATE_PROSPECT.BEGIN:
      return state.set('isCreating', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
