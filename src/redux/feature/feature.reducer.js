import Immutable from 'seamless-immutable';
import { FeatureActionTypes } from './feature.actions';

export const INITIAL_STATE = new Immutable({
  Card: false
});

export default function SiteReducer(state = INITIAL_STATE, { type, ...payload }) {
  switch (type) {
  case FeatureActionTypes.EnableFeature:
    return typeof state[payload.feature] !== 'undefined' ? state.set(payload.feature, true) : state;
  case FeatureActionTypes.DisableFeature:
    return typeof state[payload.feature] !== 'undefined' ? state.set(payload.feature, false) : state;
  case FeatureActionTypes.EnableVariant:
    return typeof state[payload.feature] !== 'undefined' ? state.set(payload.feature, payload.variant) : state;
  default:
    return state;
  }
}
