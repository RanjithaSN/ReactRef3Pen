import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { SupportRequestTypes } from '@selfcare/core/redux/supportRequest/support.request.actions';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = new Immutable({
  paymentFailureDetails: [],
  isLoaded: false,
  recentlyCreated: false,
  isSearchLoaded: false
});

export default function SupportRequestReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SupportRequestTypes.CreateSupportRequest.BEGIN:
    return state.set('recentlyCreated', false);
  case SupportRequestTypes.CreateSupportRequest.SUCCESS:
    return state.set('recentlyCreated', true);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SupportRequestTypes.CreateSupportRequest.BEGIN:
      return state.set('recentlyCreated', false);
    default:
      return state;
    }
  case '@@router/LOCATION_CHANGE':
    return state.recentlyCreated ? state.set('recentlyCreated', false) : state;
  default:
    return state;
  }
}
