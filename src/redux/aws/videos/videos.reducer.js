import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { VideosTypes } from './videos.actions';

export const INITIAL_STATE = new Immutable({
  data: [],
  isLoading: false
});

export default function VideosReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case VideosTypes.RetrieveVideos.BEGIN:
    return state.set('isLoading', true);
  case VideosTypes.RetrieveVideos.SUCCESS:
    return state.set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case VideosTypes.RetrieveVideos.BEGIN:
      return state.set('data', [])
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
