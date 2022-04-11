import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

export const PortIn = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['portIn'], subscriberApi);
});

export const PortInIsLoading = createSelector([
  PortIn
], (portIn) => {
  return pathOr(false, ['isLoading'], portIn);
});
