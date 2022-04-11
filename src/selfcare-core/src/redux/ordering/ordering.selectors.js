import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

export const Ordering = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['ordering'], subscriberApi);
});
