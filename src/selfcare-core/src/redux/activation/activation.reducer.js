import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { ActivationTypes } from './activation.actions';

export const INITIAL_STATE = new Immutable({
  data: {
    status: null
  },
  isLoading: false
});

export default function ActivationReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ActivationTypes.FixedActivationRequest.BEGIN:
    return state.setIn(['data', 'status'], null)
      .set('isLoading', true);
  case ActivationTypes.FixedActivationRequest.SUCCESS:
    return state.setIn(['data', 'status'], payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ActivationTypes.FixedActivationRequest.BEGIN:
      return state.set('isLoading', false)
        .setIn(['data', 'status'], null);
    default:
      return state;
    }
  default:
    return state;
  }
}
