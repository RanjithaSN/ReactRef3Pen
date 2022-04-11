import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { VersionTypes } from './version.actions';

export const INITIAL_STATE = new Immutable({
  versionInfo: {},
  isLoading: false
});

export default function VersionReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case VersionTypes.RetrieveVersionInformation.BEGIN:
    return state.set('isLoading', true);
  case VersionTypes.RetrieveVersionInformation.SUCCESS:
    return state.set('versionInfo', payload[0])
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case VersionTypes.RetrieveVersionInformation.BEGIN:
      return state.set('versionInfo', null)
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
