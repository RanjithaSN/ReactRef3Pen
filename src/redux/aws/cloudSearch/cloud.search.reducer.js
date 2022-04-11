import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { CloudSearchTypes } from './cloud.search.actions';


export const INITIAL_STATE = new Immutable({
  searchResults: [],
  isLoading: false
});

export default function CloudSearchReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case CloudSearchTypes.FetchSearchResults.BEGIN:
    return state.set('isLoading', true);
  case CloudSearchTypes.FetchSearchResults.SUCCESS:
    return state
      .set('isLoading', false)
      .set('searchResults', payload.hits.hit);
  case CloudSearchTypes.ClearSearchResults:
    return INITIAL_STATE;
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case CloudSearchTypes.FetchSearchResults.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
