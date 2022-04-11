import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { ConvergentBillerAccountDetailsTypes } from './convergent.biller.account.details.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export default function ConvergentBillerAccountDetailsReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
