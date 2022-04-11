import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { PortInRequestTypes } from './portin.actions';

export const INITIAL_STATE = new Immutable({
  isLoading: false
});

export default function PortInReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case PortInRequestTypes.CancelPortInRequest.BEGIN:
  case PortInRequestTypes.UpdatePortInRequest.BEGIN:
    return state.set('isLoading', true);
  case PortInRequestTypes.CancelPortInRequest.SUCCESS:
  case PortInRequestTypes.UpdatePortInRequest.SUCCESS:
    return state.set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case PortInRequestTypes.CancelPortInRequest.BEGIN:
      return state
        .set('isLoading', false);
    case PortInRequestTypes.UpdatePortInRequest.BEGIN:
      return state
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
