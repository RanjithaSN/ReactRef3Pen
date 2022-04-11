import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

export const ConvergentBiller = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['convergentBiller'], subscriberApi);
});
