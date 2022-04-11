import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberApi } from '../ascendon/ascendon.selectors';
import { SEARCH_INVENTORY_CONSTANTS } from './search.inventory.constants';

const EMPTY_ARRAY = Immutable([]);
const EMPTY_OBJECT = Immutable({});

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['searchInventory'], subscriberApi);
});

const Data = createSelector([
  Base
], (base) => {
  return pathOr(EMPTY_OBJECT, ['data'], base);
});

export const MSISDNInventoryItems = createSelector([
  Data
], (data) => {
  return pathOr(EMPTY_ARRAY, [SEARCH_INVENTORY_CONSTANTS.MSISDN], data);
});

export const IsLoadingInventoryItems = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});
