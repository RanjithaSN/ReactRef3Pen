import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import { ConvergentBiller } from '../convergentBilling/convergent.billing.selectors';

export const PROMISE_STATUS = {
  OPEN: 0,
  COMPLETED: 1,
  BROKEN: 2
};

const Base = createSelector([
  ConvergentBiller
], (convergentBiller) => {
  return pathOr(null, ['treatmentDetails'], convergentBiller);
});

export const ConvergentBillerTreatmentDetails = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data', 'SubscriberTreatmentDetails'], base);
});

export const ConvergentBillerTreatmentDetailsIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const ConvergentBillerTreatmentDetailsIsLoaded = createSelector([
  ConvergentBillerTreatmentDetails,
  ConvergentBillerTreatmentDetailsIsLoading
], (data, isLoading) => {
  return data !== null && !isLoading;
});

export const PromiseToPay = createSelector([
  ConvergentBillerTreatmentDetails
], (data) => {
  const promises = pathOr(null, ['PromiseToPayDetails'], data);

  if (promises) {
    return new Immutable(
      promises.map((promiseToPay) => ({
        currencyCode: promiseToPay.CurrencyCode,
        installmentTotal: promiseToPay.InstallmentTotal,
        installmentDueDate: promiseToPay.InstallmentDueDate,
        promiseStatus: promiseToPay.PromiseStatus,
        remainingAmount: promiseToPay.PromiseAmountRemaining
      }))
    );
  }

  return null;
});

export const EarliestOpenPromiseToPay = createSelector([
  PromiseToPay
], (promises) => {
  let earliest = null;

  if (promises) {
    const now = new Date();

    promises.forEach((promiseToPay) => {
      const promiseDueDate = new Date(promiseToPay.installmentDueDate);

      if (promiseToPay.promiseStatus === PROMISE_STATUS.OPEN && promiseDueDate >= now) {
        if (earliest) {
          const earliestDueDate = new Date(earliest.installmentDueDate);
          earliest = promiseDueDate < earliestDueDate ? promiseToPay : earliest;
        } else {
          earliest = promiseToPay;
        }
      }
    });
  }

  return earliest;
});
