import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { ConvergentBiller } from '../convergentBilling/convergent.billing.selectors';

const Base = createSelector([
  ConvergentBiller
], (convergentBiller) => {
  return pathOr(null, ['accountDetails'], convergentBiller);
});

export const ConvergentBillerAccountDetails = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const ConvergentBillerAccountDetailsIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const ConvergentBillerAccountDetailsIsLoaded = createSelector([
  ConvergentBillerAccountDetails,
  ConvergentBillerAccountDetailsIsLoading
], (data, isLoading) => {
  return data !== null && !isLoading;
});
