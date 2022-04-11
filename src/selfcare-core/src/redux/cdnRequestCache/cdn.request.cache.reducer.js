import Immutable from 'immutable/dist/immutable';
import { CdnRequestCacheActionTypes } from './cdn.request.cache.actions';

export default function CdnRequestCacheReducer(state = Immutable.Map({}), action) {
  switch (action.type) {
  case CdnRequestCacheActionTypes.UpsertSuccessfulRequest:
    return state.set(action.requestId, action.timestamp);
  default:
    return state;
  }
}
