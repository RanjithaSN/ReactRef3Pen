import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { CategoriesTypes } from './categories.actions';

export const INITIAL_STATE = new Immutable({
  data: [],
  isLoading: false
});

export default function CategoriesReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case CategoriesTypes.RetrieveCategories.BEGIN:
    return state.set('isLoading', true);
  case CategoriesTypes.RetrieveCategories.SUCCESS:
    return state.set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case CategoriesTypes.RetrieveCategories.BEGIN:
      return state.set('data', [])
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
