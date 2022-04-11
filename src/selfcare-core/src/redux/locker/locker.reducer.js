import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { LockerTypes } from './locker.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  edit: null,
  isLoading: false
});

export default function LockerReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case LockerTypes.SearchLocker.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case LockerTypes.SearchLocker.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case LockerTypes.SearchLocker.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
