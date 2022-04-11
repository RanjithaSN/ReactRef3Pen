import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { AboutPagesTypes } from './about.pages.actions';

export const INITIAL_STATE = new Immutable({
  data: [],
  isLoading: true,
  isLoaded: false
});

export default function AboutPagesReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case AboutPagesTypes.RetrieveAboutPages.BEGIN:
    return state
      .set('isLoading', true)
      .set('isLoaded', false);
  case AboutPagesTypes.RetrieveAboutPages.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false)
      .set('isLoaded', true);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case AboutPagesTypes.RetrieveAboutPages.BEGIN:
      return state
        .set('data', null)
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
