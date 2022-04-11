import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['oneTimePayment'], subscriberApi);
});

export const SubmitOneTimePaymentIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});
