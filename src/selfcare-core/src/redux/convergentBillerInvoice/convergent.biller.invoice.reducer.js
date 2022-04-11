import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { ConvergentBillerInvoiceTypes } from './convergent.biller.invoice.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoaded: false,
  isLoading: false
});

export default function ConvergentBillerInvoiceReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.BEGIN:
    return state
      .set('data', null)
      .set('isLoaded', false)
      .set('isLoading', true);
  case ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false)
      .set('isLoaded', true);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.BEGIN:
      return state
        .set('isLoaded', false)
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
