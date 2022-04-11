import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['subscriberInventory'], subscriberApi);
});

const SubscriberInventoryData = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const SubscriberInventory = createSelector([
  SubscriberInventoryData
], (data) => {
  return pathOr(EMPTY_ARRAY, ['SubscriberInventoryItems'], data);
});

export const SubscriberInventoryIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const SubscriberInventoryIsLoaded = createSelector([
  SubscriberInventoryData,
  SubscriberInventoryIsLoading
], (data, isLoading) => {
  return data !== null && !isLoading;
});
