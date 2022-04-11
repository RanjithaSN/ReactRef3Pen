import { ACCOUNT_CHANGED } from '@selfcare/core/redux/account/account.action.constants';
import { ConvergentBillerSummaryActionTypes } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import reducer, { INITIAL_STATE } from './account.reducer';

describe('Site Reducer', () => {
  describe('When AccountTypes.UpdateCurrentAccount is dispatched...', () => {
    test('It should set the currentAccount to the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: ACCOUNT_CHANGED,
        payload: {
          id: '12345'
        }
      });
      expect(response.currentAccount).toEqual('12345');
    });
  });

  describe('When ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS is dispatched...', () => {
    const payload = {
      SubscriberSummary: {
        AccountSummaries: [{
          AccountNumber: '1'
        }, {
          AccountNumber: '2'
        }]
      }
    };

    test('It should set the defaultUserAccount and currentAccount to the AccountNumber of the first AccountSummary in the SubscriberSummary of the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS,
        payload
      });

      expect(response.defaultUserAccount).toEqual('1');
      expect(response.currentAccount).toEqual('1');
    });

    test('It should not fail when there are no items in the account summary, and should return null', () => {
      const response = reducer(INITIAL_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS,
        payload: {
          SubscriberSummary: {
            AccountSummaries: []
          }
        }
      });
      expect(response.defaultUserAccount).toBeNull();
      expect(response.currentAccount).toBeNull();
    });

    test('It should not fail when there are no items in the account summary, and should return null for defaultUserAccount and the correct current account', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('currentAccount', 'MY_TEST_ACCOUNT')
        .set('defaultManagedAccount', 'MY_MANAGED_ACCOUNT');
      const response = reducer(CUSTOM_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS,
        payload: {
          SubscriberSummary: {
            AccountSummaries: []
          }
        }
      });
      expect(response.defaultUserAccount).toBeNull();
      expect(response.currentAccount).toEqual('MY_TEST_ACCOUNT');
    });

    test('When user accounts are loaded it should return the user account id for defaultUserAccount and the correct current account (saved)', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('currentAccount', 'MY_TEST_ACCOUNT')
        .set('defaultManagedAccount', 'MY_MANAGED_ACCOUNT');
      const response = reducer(CUSTOM_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS,
        payload
      });
      expect(response.defaultUserAccount).toEqual('1');
      expect(response.currentAccount).toEqual('MY_TEST_ACCOUNT');
    });

    test('When user accounts are loaded it should return the user account id for defaultUserAccount and the correct current account (managed)', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('defaultManagedAccount', 'MY_MANAGED_ACCOUNT');
      const response = reducer(CUSTOM_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS,
        payload
      });
      expect(response.defaultUserAccount).toEqual('1');
      expect(response.currentAccount).toEqual('MY_MANAGED_ACCOUNT');
    });
  });

  describe('When ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS is dispatched...', () => {
    const payload = {
      SubscriberAccounts: [{
        SubscriberId: 1,
        companyName: 'one',
        Accounts: [{
          AccountNumber: '1-1'
        }, {
          AccountNumber: '1-2'
        }]
      },
      {
        SubscriberId: 2,
        companyName: 'two',
        Accounts: [{
          AccountNumber: '2-1'
        }, {
          AccountNumber: '2-2'
        }]
      }]
    };

    test('It should set the defaultManagedAccount to the AccountNumber of the first AccountSummaries in the first SubscriberAccounts object of the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS,
        payload
      });

      expect(response.defaultManagedAccount).toEqual('1-1');
      expect(response.currentAccount).toEqual('1-1');
    });

    test('It should not fail when there are no items in the account summary, and should return null', () => {
      const response = reducer(INITIAL_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS,
        payload: {
          SubscriberAccounts: []
        }
      });
      expect(response.defaultManagedAccount).toBeNull();
      expect(response.currentAccount).toBeNull();
    });

    test('When user accounts are loaded it should return the user account id for defaultManagedAccount and the correct current account (saved)', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('currentAccount', 'MY_TEST_ACCOUNT')
        .set('defaultUserAccount', 'MY_USER_ACCOUNT')
        .set('defaultManagedAccount', 'MY_MANAGED_ACCOUNT');
      const response = reducer(CUSTOM_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS,
        payload
      });
      expect(response.defaultManagedAccount).toEqual('1-1');
      expect(response.currentAccount).toEqual('MY_TEST_ACCOUNT');
    });

    test('When user accounts are loaded it should return the user account id for defaultManagedAccount and the correct current account (managed)', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('defaultManagedAccount', 'MY_MANAGED_ACCOUNT')
        .set('defaultUserAccount', 'MY_USER_ACCOUNT');
      const response = reducer(CUSTOM_STATE, {
        type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS,
        payload
      });
      expect(response.defaultManagedAccount).toEqual('1-1');
      expect(response.currentAccount).toEqual('1-1');
    });
  });
});
