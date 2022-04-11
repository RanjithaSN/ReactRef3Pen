import path from 'ramda/src/path';
import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SearchServicesTypes } from './search.services.actions';

export default function SearchServicesReducer(state = new Immutable({}), { payload = {}, type }) {
  switch (type) {
  case SearchServicesTypes.SearchServices.BEGIN:
    return state.set('isLoading', true);
  case SearchServicesTypes.SearchServices.SUCCESS: {
    return state.setIn(['data', path(['ServiceThumbnails', 0, 'ServiceIdentifier'], payload)], payload)
      .set('isLoading', false);
  }
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SearchServicesTypes.SearchServices.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
