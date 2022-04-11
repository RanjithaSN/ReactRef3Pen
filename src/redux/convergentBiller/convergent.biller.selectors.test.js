import Immutable from 'seamless-immutable';
import { MANAGED_ACCOUNTS_INITIAL_STATE } from './convergent.biller.reducer';
import * as ConvergentBiller from './convergent.biller.selectors';

const DEFAULT_STORE = Immutable({})
  .setIn(['client', 'convergentBiller', 'managedAccount'], MANAGED_ACCOUNTS_INITIAL_STATE);

const MANAGED_ACCOUNTS_DATA = {
  isLoading: true,
  data: {
    id: 'here'
  }
};
const TEST_STORE = Immutable({})
  .setIn(['client', 'convergentBiller', 'managedAccount'], MANAGED_ACCOUNTS_DATA);

describe('Convergent Biller ...', () => {
  describe('When ConvergentBillerBase is used...', () => {
    it('should return null when the managed accounts are not loaded', () => {
      expect(ConvergentBiller.ConvergentBillerBase()).toEqual(null);
    });
    it('should return default store when it is sent in', () => {
      expect(ConvergentBiller.ConvergentBillerBase(DEFAULT_STORE)).toEqual({
        managedAccount: MANAGED_ACCOUNTS_INITIAL_STATE
      });
    });
    it('should return data from store when it is sent in', () => {
      expect(ConvergentBiller.ConvergentBillerBase(TEST_STORE)).toEqual({
        managedAccount: MANAGED_ACCOUNTS_DATA
      });
    });
  });
  describe('When ConvergentBillerManagedAccount is used...', () => {
    it('should return null when the managed accounts are not loaded', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccount()).toEqual(null);
    });
    it('should return default store when it is sent in', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccount(DEFAULT_STORE)).toEqual(MANAGED_ACCOUNTS_INITIAL_STATE);
    });
    it('should return data from store when it is sent in', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccount(TEST_STORE)).toEqual(MANAGED_ACCOUNTS_DATA);
    });
  });
  describe('When ConvergentBillerManagedAccountLoading is used...', () => {
    it('should return false when the managed accounts are not loaded', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccountLoading()).toEqual(false);
    });
    it('should return default store when it is sent in', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccountLoading(DEFAULT_STORE)).toEqual(false);
    });
    it('should return data from store when it is sent in', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccountLoading(TEST_STORE)).toEqual(true);
    });
  });
  describe('When ConvergentBillerManagedAccountSummary is used...', () => {
    it('should return null when the managed accounts are not loaded', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccountSummary()).toEqual(null);
    });
    it('should return default store when it is sent in', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccountSummary(DEFAULT_STORE)).toEqual(MANAGED_ACCOUNTS_INITIAL_STATE.data);
    });
    it('should return data from store when it is sent in', () => {
      expect(ConvergentBiller.ConvergentBillerManagedAccountSummary(TEST_STORE)).toEqual(MANAGED_ACCOUNTS_DATA.data);
    });
  });
  describe('When ConvergentBillerAccountsLoading is used...', () => {
    it('should return null when the managed accounts are not loaded', () => {
      expect(ConvergentBiller.ConvergentBillerAccountsLoading()).toEqual(false);
    });
    it('should return true if any of the accounts are loading', () => {
      expect(ConvergentBiller.ConvergentBillerAccountsLoading.resultFunc(true, false, false)).toEqual(true);
      expect(ConvergentBiller.ConvergentBillerAccountsLoading.resultFunc(false, true, false)).toEqual(true);
      expect(ConvergentBiller.ConvergentBillerAccountsLoading.resultFunc(false, false, true)).toEqual(true);
      expect(ConvergentBiller.ConvergentBillerAccountsLoading.resultFunc(true, true, false)).toEqual(true);
      expect(ConvergentBiller.ConvergentBillerAccountsLoading.resultFunc(true, false, true)).toEqual(true);
      expect(ConvergentBiller.ConvergentBillerAccountsLoading.resultFunc(true, true, true)).toEqual(true);
    });
    it('should return false if none of the accounts are loading', () => {
      expect(ConvergentBiller.ConvergentBillerAccountsLoading.resultFunc(false, false, false)).toEqual(false);
    });
  });
});
