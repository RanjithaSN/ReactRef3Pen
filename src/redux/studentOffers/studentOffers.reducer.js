import { StudentOfferTypes } from './studentOffers.actions';
import { FaultTypes } from 'selfcare-core/src/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = new Immutable({
  isLoading: false,
  decisions: null
});

// eslint-disable-next-line unused-imports/no-unused-vars
export default function StudentOfferReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case StudentOfferTypes.STUDENT_SSN_CHECK.BEGIN:
    return state
      .set('isLoading', true);
  case StudentOfferTypes.STUDENT_SSN_CHECK.SUCCESS:
    return state
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    return state.set('isLoading', false);
  default:
    return state;
  }
}

export const saveDecisions = (state = Immutable(null), { payload, type }) => {
  switch (type) {
  case StudentOfferTypes.TEST:
    return payload.test;
  default:
    return state;
  }
};
