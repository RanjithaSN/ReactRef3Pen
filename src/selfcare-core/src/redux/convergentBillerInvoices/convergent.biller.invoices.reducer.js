import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { ConvergentBillerInvoicesTypes } from './convergent.biller.invoices.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export default function ConvergentBillerInvoicesReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ConvergentBillerInvoicesTypes.RetrieveConvergentBillerInvoices.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case ConvergentBillerInvoicesTypes.RetrieveConvergentBillerInvoices.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ConvergentBillerInvoicesTypes.RetrieveConvergentBillerInvoices.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
