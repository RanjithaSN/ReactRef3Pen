import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['searchOrders'], subscriberApi);
});

export const SearchOrdersData = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const SearchOrdersIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const SearchOrders = createSelector([
  SearchOrdersData
], (order) => {
  return pathOr(EMPTY_ARRAY, ['Orders'], order);
});
