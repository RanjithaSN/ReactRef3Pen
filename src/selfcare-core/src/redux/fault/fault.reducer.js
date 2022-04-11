import Immutable from 'seamless-immutable';
import path from 'ramda/src/path';
import { FaultTypes } from './fault.actions';

export const INITIAL_STATE = new Immutable({
  data: null
});

export default function FaultReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case FaultTypes.API_FAULT:
    return state.set('data', payload);
  case FaultTypes.CLEAR_API_FAULT:
  case '@@router/LOCATION_CHANGE':
    return state.set('data', null);
  default:
    return type === path(['data', 'trigger'], state) ?
      state.set('data', null) :
      state;
  }
}
