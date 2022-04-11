import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { ConvergentBiller } from '../convergentBilling/convergent.billing.selectors';

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

export const TREATMENT_STATUS = {
  NONE: 0,
  IN_TREATMENT: 1,
  PROMISE_TO_PAY: 2
};

export const ConvergentBillerAccountInfo = createSelector([
  ConvergentBiller
], (convergentBiller) => {
  return pathOr(null, ['accountInfo'], convergentBiller);
});

export const ConvergentBillerSummary = createSelector([
  ConvergentBillerAccountInfo
], (convergentBiller) => {
  return pathOr(null, ['summary'], convergentBiller);
});

export const ConvergentBillerSummaryData = createSelector([
  ConvergentBillerSummary
], (summary) => {
  return pathOr(null, ['data'], summary);
});

export const ConvergentBillerSummaryServices = createSelector([
  ConvergentBillerSummaryData
], (summaryData) => {
  return pathOr(EMPTY_ARRAY, ['AccountSummaries', 0, 'Services'], summaryData);
});

export const IsConvergentBillerSummaryLoading = createSelector([
  ConvergentBillerSummary
], (summary) => {
  return pathOr(false, ['isLoading'], summary);
});

export const DoConvergentBillerSummaryNeedRefreshed = createSelector([
  ConvergentBillerSummary
], (summary) => {
  return pathOr(false, ['accountsNeedRefreshed'], summary);
});

export const IsConvergentBillerInTreatment = createSelector([
  ConvergentBillerSummaryData
], (summary) => {
  const status = pathOr(TREATMENT_STATUS.NONE, ['TreatmentStatus'], summary);
  return status !== TREATMENT_STATUS.NONE;
});

export const ConvergentBillerManagedAccounts = createSelector([
  ConvergentBillerAccountInfo
], (convergentBiller) => {
  return pathOr(null, ['managedAccounts'], convergentBiller);
});

export const ConvergentBillerManagedAccountsData = createSelector([
  ConvergentBillerManagedAccounts
], (accounts) => {
  return pathOr(EMPTY_OBJECT, ['data'], accounts);
});

export const AreConvergentBillerManagedAccountsLoading = createSelector([
  ConvergentBillerManagedAccounts
], (accounts) => pathOr(false, ['isLoading'], accounts));
