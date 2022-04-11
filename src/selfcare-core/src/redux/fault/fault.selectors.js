import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['fault'], subscriberApi);
});

export const Fault = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});
