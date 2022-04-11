import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const Base = createSelector([
  SubscriberApi
], (subscriberApiSelector) => {
  return pathOr(null, ['invoice'], subscriberApiSelector);
});

export const ConvergentBillerIsInvoiceLoaded = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoaded'], base);
});

export const ConvergentBillerIsInvoiceLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});
