import Immutable from 'seamless-immutable';
import * as Wallet from './wallet.selectors';
import { INITIAL_STATE } from './wallet.reducer';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      wallet: INITIAL_STATE
    }
  }
});

describe('Wallet ', () => {
  describe('When the Wallet is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'wallet', 'data'], DATA);
      expect(Wallet.Wallet(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Wallet.Wallet()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(Wallet.Wallet.resultFunc({})).toBeNull();
    });
  });

  describe('When the WalletIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'wallet', 'isLoading'], true);
      expect(Wallet.WalletIsLoading(CUSTOM_STATE)).toBe(true);
    });
    test('It should return true when PaymentInstrumentIsLoading returns true', () => {
      expect(Wallet.WalletIsLoading.resultFunc({}, true)).toBe(true);
    });
    test('It should return false when no store is passed in.', () => {
      expect(Wallet.WalletIsLoading()).toBe(false);
    });
    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(Wallet.WalletIsLoading.resultFunc({})).toBe(false);
    });
  });

  describe('When the WalletIsLoaded is used...', () => {
    test('It should return true if there is data and we are not loading.', () => {
      expect(Wallet.WalletIsLoaded.resultFunc({}, false)).toBe(true);
    });

    test('It should return false when there is no data.', () => {
      expect(Wallet.WalletIsLoaded.resultFunc(null, false)).toBe(false);
    });

    test('It should return false when we are loading.', () => {
      expect(Wallet.WalletIsLoaded.resultFunc({}, true)).toBe(false);
    });
  });
});
