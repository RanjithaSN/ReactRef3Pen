import { call } from 'redux-saga/effects';
import { apiSagaHelper } from '../utils/cdn.sagas';
import { SearchOfferTypes } from './search.offers.actions';

export function* searchOffers(options = {}) {
  const config = {
    method: 'post',
    url: 'subscriber/SearchOfferings'
  };
  const requestObject = {
    ...options
  };
  yield call(apiSagaHelper, SearchOfferTypes.SearchOfferings, config, requestObject);
}
