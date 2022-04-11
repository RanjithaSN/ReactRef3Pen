import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_OBJECT = {};

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['searchServices'], subscriberApi);
});

export const SearchServicesData = createSelector([
  Base
], (base) => {
  return pathOr(EMPTY_OBJECT, ['data'], base);
});
