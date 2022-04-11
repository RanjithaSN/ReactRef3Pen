import Immutable from 'seamless-immutable';
import {
  ConvergentBillerAreInvoicesAvailable,
  ConvergentBillerInvoiceSummary,
  ConvergentBillerInvoices,
  MostRecentConvergentBillerInvoice
} from './convergent.biller.invoices.selectors';
import { INITIAL_STATE } from './convergent.biller.invoices.reducer';

const getTodayMinusDays = (days) => {
  const today = new Date();
  const future = new Date(today.setDate(today.getDate() - days));
  return future.toISOString();
};

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      convergentBiller: {
        invoices: INITIAL_STATE
      }
    }
  }
});

describe('ConvergentBillerInvoices ', () => {
  describe('When the ConvergentBillerInvoiceSummary is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        invoiceSummary: {
          issueDate: '5/5/18'
        }
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data'], DATA);
      expect(
        ConvergentBillerInvoiceSummary(CUSTOM_STATE)
      ).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(ConvergentBillerInvoiceSummary()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(ConvergentBillerInvoiceSummary.resultFunc({})).toBeNull();
    });
  });

  describe('When the ConvergentBillerInvoices is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = [
        {
          issueDate: '5/5/18'
        }
      ];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(
        ConvergentBillerInvoices(CUSTOM_STATE)
      ).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(ConvergentBillerInvoices()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(ConvergentBillerInvoices.resultFunc({})).toBeNull();
    });
  });

  describe('When the ConvergentBillerAreInvoicesAvailable is used...', () => {
    test('It should return false when invoices are not set', () => {
      const DATA = null;
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(ConvergentBillerAreInvoicesAvailable(CUSTOM_STATE)).toEqual(false);
    });
    test('It should return false when there are are no invoices', () => {
      const DATA = [];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(ConvergentBillerAreInvoicesAvailable(CUSTOM_STATE)).toEqual(false);
    });
    test('It should return true when there are invoices', () => {
      const DATA = [{
        IssueDate: getTodayMinusDays(1)
      }];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(ConvergentBillerAreInvoicesAvailable(CUSTOM_STATE)).toEqual(true);
    });
  });
  describe('When the MostRecentConvergentBillerInvoice is used...', () => {
    const ONE_DAY_AGO = {
      IssueDate: getTodayMinusDays(1)
    };
    const TWO_DAYS_AGO = {
      IssueDate: getTodayMinusDays(2)
    };
    const THREE_DAYS_AGO = {
      IssueDate: getTodayMinusDays(3)
    };
    test('It should return null when invoices are not set', () => {
      const DATA = null;
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(MostRecentConvergentBillerInvoice(CUSTOM_STATE)).toEqual(null);
    });
    test('It should return null when there are are no invoices', () => {
      const DATA = [];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(MostRecentConvergentBillerInvoice(CUSTOM_STATE)).toEqual(null);
    });
    test('It should return the most recent date', () => {
      const DATA = [THREE_DAYS_AGO, ONE_DAY_AGO, TWO_DAYS_AGO];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(MostRecentConvergentBillerInvoice(CUSTOM_STATE)).toEqual(ONE_DAY_AGO);
    });
    test('It should return the latest date', () => {
      const DATA = [THREE_DAYS_AGO, TWO_DAYS_AGO, ONE_DAY_AGO];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(MostRecentConvergentBillerInvoice(CUSTOM_STATE)).toEqual(ONE_DAY_AGO);
    });
    test('It should return the newest date', () => {
      const DATA = [ONE_DAY_AGO, THREE_DAYS_AGO, TWO_DAYS_AGO];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoices', 'data', 'Invoices'], DATA);
      expect(MostRecentConvergentBillerInvoice(CUSTOM_STATE)).toEqual(ONE_DAY_AGO);
    });
  });
});
