import Immutable from 'seamless-immutable';
import { ConfigurationActionTypes } from './configuration.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export default function ConfigurationReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ConfigurationActionTypes.RetrieveConfiguration.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case ConfigurationActionTypes.RetrieveConfiguration.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  default:
    return state;
  }
}
