import Immutable from 'seamless-immutable';
import * as ConvergentBillerTreatmentDetails from './convergent.biller.treatment.details.selectors';
import { INITIAL_STATE } from './convergent.biller.treatment.details.reducer';

const getTodayPlusDays = (days) => {
  const today = new Date();
  const future = new Date(today.setDate(today.getDate() + days));
  return future.toISOString();
};

export const INITIAL_STORE = new Immutable({
  ascendon: {
    subscriberApi: {
      convergentBiller: {
        treatmentDetails: INITIAL_STATE
      }
    }
  }
});

export const POPULATED_STORE_DATA = {
  SubscriberTreatmentDetails: {
    TreatmentReason: 0,
    DelinquentDays: 2,
    PromiseToPayDetails: [{
      InstallmentDueDate: getTodayPlusDays(1),
      InstallmentTotal: 101.00,
      PromiseStatus: ConvergentBillerTreatmentDetails.PROMISE_STATUS.COMPLETED
    }, {
      InstallmentDueDate: getTodayPlusDays(4),
      InstallmentTotal: 102.00,
      PromiseStatus: ConvergentBillerTreatmentDetails.PROMISE_STATUS.OPEN
    }, {
      InstallmentDueDate: getTodayPlusDays(2),
      InstallmentTotal: 103.00,
      PromiseStatus: ConvergentBillerTreatmentDetails.PROMISE_STATUS.OPEN
    }, {
      InstallmentDueDate: getTodayPlusDays(3),
      InstallmentTotal: 104.00,
      PromiseStatus: ConvergentBillerTreatmentDetails.PROMISE_STATUS.OPEN
    }]
  }
};

export const SELECTED_PROMISES_TO_PAY = POPULATED_STORE_DATA
  .SubscriberTreatmentDetails
  .PromiseToPayDetails
  .map(({ InstallmentDueDate, InstallmentTotal, PromiseStatus }) => ({
    installmentDueDate: InstallmentDueDate,
    installmentTotal: InstallmentTotal,
    promiseStatus: PromiseStatus
  }));

export const POPULATED_STORE = INITIAL_STORE
  .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'treatmentDetails', 'data'], POPULATED_STORE_DATA);
