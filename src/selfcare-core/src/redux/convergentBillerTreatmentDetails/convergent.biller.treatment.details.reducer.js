import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { ConvergentBillerTreatmentDetailsTypes } from './convergent.biller.treatment.details.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export default function ConvergentBillerTreatmentDetailsReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ConvergentBillerTreatmentDetailsTypes.RetrieveConvergentBillerTreatmentDetails.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case ConvergentBillerTreatmentDetailsTypes.RetrieveConvergentBillerTreatmentDetails.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ConvergentBillerTreatmentDetailsTypes.RetrieveConvergentBillerTreatmentDetails.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
