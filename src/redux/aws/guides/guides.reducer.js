import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { GuidesTypes } from './guides.actions';

export const INITIAL_STATE = new Immutable({
  data: [],
  isLoading: false
});

export default function GuidesReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case GuidesTypes.RetrieveGuides.BEGIN:
    return state.set('isLoading', true);
  case GuidesTypes.RetrieveGuides.SUCCESS:
    return state.set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case GuidesTypes.RetrieveGuides.BEGIN:
      return state.set('data', [])
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
