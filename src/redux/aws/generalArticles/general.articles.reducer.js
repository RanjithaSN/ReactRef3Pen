import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { GeneralArticlesTypes } from './general.articles.actions';

export const INITIAL_STATE = new Immutable({
  data: [],
  isLoading: false
});

export default function GeneralArticlesReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case GeneralArticlesTypes.RetrieveGeneralArticles.BEGIN:
    return state.set('isLoading', true);
  case GeneralArticlesTypes.RetrieveGeneralArticles.SUCCESS:
    return state.set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case GeneralArticlesTypes.RetrieveGeneralArticles.BEGIN:
      return state.set('data', [])
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
