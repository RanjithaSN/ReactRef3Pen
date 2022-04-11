import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['locker'], subscriberApi);
});

export const Locker = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const LockerItems = createSelector([
  Locker
], (locker) => {
  return pathOr(EMPTY_ARRAY, ['LockerItems'], locker);
});
