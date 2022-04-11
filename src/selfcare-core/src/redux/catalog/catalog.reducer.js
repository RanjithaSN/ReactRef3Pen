import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { CatalogTypes } from './catalog.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export default function CatalogReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case CatalogTypes.SearchCatalog.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case CatalogTypes.SearchCatalog.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case CatalogTypes.SearchCatalog.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
