import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './convergent.biller.account.details.reducer';
import * as ConvergentBillerAccountDetails from './convergent.biller.account.details.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      convergentBiller: {
        accountDetails: INITIAL_STATE
      }
    }
  }
});

describe('ConvergentBillerAccountDetails ', () => {
  describe('When the ConvergentBillerAccountDetails is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountDetails', 'data'], DATA);
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetails(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetails()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetails.resultFunc({})).toBeNull();
    });
  });

  describe('When the ConvergentBillerAccountDetailsIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountDetails', 'isLoading'], true);
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetailsIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetailsIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetailsIsLoading.resultFunc({})).toBe(false);
    });
  });

  describe('When the ConvergentBillerAccountDetailsIsLoaded is used...', () => {
    test('It should return true if there is data and we are not loading.', () => {
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetailsIsLoaded.resultFunc({}, false)).toBe(true);
    });

    test('It should return false when there is no data.', () => {
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetailsIsLoaded.resultFunc(null, false)).toBe(false);
    });

    test('It should return false when we are loading.', () => {
      expect(ConvergentBillerAccountDetails.ConvergentBillerAccountDetailsIsLoaded.resultFunc({}, true)).toBe(false);
    });
  });
});
