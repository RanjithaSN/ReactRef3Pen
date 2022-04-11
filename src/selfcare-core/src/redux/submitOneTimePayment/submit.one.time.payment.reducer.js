import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SubmitOneTimePaymentTypes } from './submit.one.time.payment.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export default function SubmitOneTimePaymentReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SubmitOneTimePaymentTypes.SubmitPaymentRetry.BEGIN:
    return state.set('data', null).set('isLoading', true);
  case SubmitOneTimePaymentTypes.SubmitPaymentRetry.SUCCESS:
    return state.set('data', payload).set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SubmitOneTimePaymentTypes.SubmitPaymentRetry.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  case '@@router/LOCATION_CHANGE':
    return state.set('data', null);
  default:
    return state;
  }
}
