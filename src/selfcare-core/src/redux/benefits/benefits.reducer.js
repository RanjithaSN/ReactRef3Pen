import Immutable from 'seamless-immutable';
import { BenefitsTypes } from './benefits.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export default function BenefitsReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case BenefitsTypes.RetrieveConfig.BEGIN:
    return state.setIn(['isLoading'], true);
  case BenefitsTypes.RetrieveConfig.SUCCESS:
    return state
      .setIn(['data'], payload)
      .setIn(['isLoading'], false);
  case BenefitsTypes.RetrieveConfig.FAILURE:
    return state
      .setIn(['data', payload])
      .setIn(['isLoading', false]);
  default:
    return state;
  }
}
