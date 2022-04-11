import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return path(['activation'], subscriberApi);
});

export const ActivationIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});
