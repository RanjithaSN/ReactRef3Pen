import Immutable from 'seamless-immutable';
import { MANAGED_INITIAL_STATE, SUMMARY_INITIAL_STATE } from './convergent.biller.summary.reducer';
import * as ConvergentBillerSummary from './convergent.biller.summary.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      convergentBiller: {
        accountInfo: {
          summary: SUMMARY_INITIAL_STATE,
          managedAccounts: MANAGED_INITIAL_STATE
        }
      }
    }
  }
});

const getTreatmentStatusStore = (status) => (
  new Immutable({
    ascendon: {
      subscriberApi: {
        convergentBiller: {
          accountInfo: {
            summary: {
              data: {
                TreatmentStatus: status
              }
            }
          }
        }
      }
    }
  })
);

describe('Convergent Biller Summary ', () => {
  describe('When the ConvergentBillerAccountInfo is used...', () => {
    test('It should return the value of the convergent biller account infor attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'isLoading'], true);
      expect(ConvergentBillerSummary.ConvergentBillerAccountInfo(CUSTOM_STATE)).toEqual({
        managedAccounts: MANAGED_INITIAL_STATE,
        summary: {
          accountsNeedRefreshed: false,
          data: null,
          isLoading: true
        }
      });
    });

    test('It should return null when there is no isLoading attribute in the store.', () => {
      expect(ConvergentBillerSummary.ConvergentBillerAccountInfo.resultFunc({})).toBe(null);
    });
  });
  describe('When the ConvergentBillerManagedAccounts is used...', () => {
    test('It should return the value of the convergent biller accounts attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'managedAccounts', 'isLoading'], true);
      expect(ConvergentBillerSummary.ConvergentBillerManagedAccounts(CUSTOM_STATE)).toEqual({
        data: {},
        isLoading: true
      });
    });

    test('It should return null when no store is passed in.', () => {
      expect(ConvergentBillerSummary.ConvergentBillerManagedAccounts()).toBe(null);
    });
  });
  describe('When the ConvergentBillerManagedAccountsData is used...', () => {
    test('It should return the value of the convergent biller accounts attribute when one exists.', () => {
      const data = [{
        id: 'test'
      }];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'managedAccounts', 'data'], data);
      expect(ConvergentBillerSummary.ConvergentBillerManagedAccountsData(CUSTOM_STATE)).toEqual(data);
    });

    test('It should return null when no store is passed in.', () => {
      expect(ConvergentBillerSummary.ConvergentBillerManagedAccountsData()).toEqual({});
    });
  });
  describe('When the AreConvergentBillerManagedAccountsLoading is used...', () => {
    test('It should return the value of the convergent biller accounts attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'managedAccounts', 'isLoading'], true);
      expect(ConvergentBillerSummary.AreConvergentBillerManagedAccountsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return null when no store is passed in.', () => {
      expect(ConvergentBillerSummary.AreConvergentBillerManagedAccountsLoading()).toBe(false);
    });
  });
  describe('When the IsConvergentBillerSummaryLoading is used...', () => {
    test('It should return the value of the isLoadingSummary attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'isLoading'], true);
      expect(ConvergentBillerSummary.IsConvergentBillerSummaryLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(ConvergentBillerSummary.IsConvergentBillerSummaryLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(ConvergentBillerSummary.IsConvergentBillerSummaryLoading.resultFunc({})).toBe(false);
    });
  });

  describe('When DoConvergentBillerSummaryNeedRefreshed is used...', () => {
    it('should return false when the managed accounts are not loaded', () => {
      expect(ConvergentBillerSummary.DoConvergentBillerSummaryNeedRefreshed()).toBe(false);
    });
    it('should return false when default store is sent in', () => {
      expect(ConvergentBillerSummary.DoConvergentBillerSummaryNeedRefreshed(initializedStore)).toBe(false);
    });
    it('should return true when it has been sent in', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'accountsNeedRefreshed'], true);
      expect(ConvergentBillerSummary.DoConvergentBillerSummaryNeedRefreshed(CUSTOM_STATE)).toBe(true);
    });
  });

  describe('When the IsConvergentBillerInTreatment is used...', () => {
    test('It should return a false value with the initial store', () => {
      expect(
        ConvergentBillerSummary.IsConvergentBillerInTreatment(SUMMARY_INITIAL_STATE)
      ).toBe(false);
    });

    test('It should return a true value when a non-none treatment status is found', () => {
      expect(
        ConvergentBillerSummary.IsConvergentBillerInTreatment(
          getTreatmentStatusStore(ConvergentBillerSummary.TREATMENT_STATUS.IN_TREATMENT)
        )
      ).toBe(true);
    });

    test('It should return a false value when a none treatment status is found', () => {
      expect(
        ConvergentBillerSummary.IsConvergentBillerInTreatment(
          getTreatmentStatusStore(ConvergentBillerSummary.TREATMENT_STATUS.NONE)
        )
      ).toBe(false);
    });
  });
});
