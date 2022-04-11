import { SUMMARY_INITIAL_STATE } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.reducer';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE as ACCOUNT_INITIAL_STATE } from './account.reducer';
import * as Account from './account.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      convergentBiller: {
        accountInfo: {
          summary: SUMMARY_INITIAL_STATE
        }
      }
    }
  },
  client: {
    account: ACCOUNT_INITIAL_STATE
  }
});

const accountWithServices = new Immutable({
  Services: [{
    ServiceIdentifier: {
      Value: '2'
    },
    EntitlementBalances: []
  }, {
    ServiceIdentifier: {
      Value: '1'
    },
    EntitlementBalances: [{
      BalanceConsumed: 2.251,
      BalanceUnitCode: 1,
      ExpirationDate: new Date('2018-03-21T16:55:11.115Z')
    }]
  },
  {
    ServiceIdentifier: {
      Value: '89a7c1cd-2d49-4481-86b5-dc01f588d37e'
    },
    EntitlementBalances: []
  }
  ]
});

describe('Account ...', () => {
  describe('When the CurrentAccountId is used...', () => {
    test('It should return the value of the currentAccount attribute when one exists.', () => {
      const DATA = {
        defaultAccountsAccount: '456',
        defaultSummaryAccount: '789',
        currentAccount: '123'
      };
      const CUSTOM_STATE = initializedStore.setIn(['client', 'account'], DATA);
      expect(Account.CurrentAccountId(CUSTOM_STATE)).toEqual(DATA.currentAccount);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Account.CurrentAccountId()).toBeNull();
    });

    test('It should return null when there is no site attribute in the store.', () => {
      expect(Account.CurrentAccountId.resultFunc({})).toBeNull();
    });
  });

  describe('When the ManagedAccountSubscriberId is used...', () => {
    test('It should return the subscriberId when there is a managed account', () => {
      expect(Account.ManagedAccountSubscriberId.resultFunc({
        subscriberId: 352404
      })).toBe(352404);
    });

    test('It should return null when there are no managed accounts', () => {
      expect(Account.ManagedAccountSubscriberId.resultFunc(null)).toBe(undefined);
    });
  });

  describe('When the CurrentAccount is used...', () => {
    test('It should return the account summary for the account with a matching account number to the currentAccount attribute when one exists.', () => {
      const ACCOUNT_DATA = {
        currentAccount: '1'
      };
      const ACCOUNT_SUMMARY = {
        AccountNumber: '1'
      };
      const ACCOUNT_SUMMARY_2 = {
        AccountNumber: '2'
      };
      const CONVERGENT_BILLER_SUMMARY_DATA = {
        AccountSummaries: [ACCOUNT_SUMMARY, ACCOUNT_SUMMARY_2]
      };

      const CUSTOM_STATE = initializedStore.setIn(['client', 'account'], ACCOUNT_DATA)
        .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'data'], CONVERGENT_BILLER_SUMMARY_DATA);
      expect(Account.CurrentAccount(CUSTOM_STATE)).toEqual(ACCOUNT_SUMMARY);
    });
    test('It should return the account summary for the account with a matching account number to the currentAccount attribute when one exists, even for managed accounts.', () => {
      const ACCOUNT_DATA = {
        currentAccount: '15'
      };
      const ACCOUNT_SUMMARY = {
        AccountNumber: '1'
      };
      const ACCOUNT_SUMMARY_2 = {
        AccountNumber: '2'
      };
      const ACCOUNT_SUMMARY_4 = {
        SubscriberId: 100,
        Accounts: [{
          AccountNumber: '14'
        }]
      };
      const ACCOUNT_SUMMARY_5 = {
        SubscriberId: 102,
        Accounts: [{
          AccountNumber: '25',
          AccountType: 10
        },
        {
          AccountNumber: '15',
          AccountType: 1
        },
        {
          AccountNumber: '155',
          AccountType: 1
        }
        ]
      };
      const CONVERGENT_BILLER_SUMMARY_DATA = {
        AccountSummaries: [ACCOUNT_SUMMARY, ACCOUNT_SUMMARY_2]
      };
      const MANAGED_ACCOUNT_DATA = {
        [ACCOUNT_SUMMARY_4.SubscriberId]: ACCOUNT_SUMMARY_4,
        [ACCOUNT_SUMMARY_5.SubscriberId]: ACCOUNT_SUMMARY_5
      };
      const CUSTOM_STATE = initializedStore.setIn(['client', 'account'], ACCOUNT_DATA)
        .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'managedAccounts', 'data'], MANAGED_ACCOUNT_DATA)
        .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'data'], CONVERGENT_BILLER_SUMMARY_DATA);
      expect(Account.CurrentAccount(CUSTOM_STATE).accountNumber).toEqual(ACCOUNT_DATA.currentAccount);
    });

    test('It should return null when there is no account summary with a matching account number to the currentAccount attribute.', () => {
      const ACCOUNT_DATA = {
        currentAccount: '1'
      };
      const ACCOUNT_SUMMARY = {
        AccountNumber: '2'
      };
      const CONVERGENT_BILLER_SUMMARY_DATA = {
        AccountSummaries: [ACCOUNT_SUMMARY]
      };

      const CUSTOM_STATE = initializedStore.setIn(['client', 'account'], ACCOUNT_DATA)
        .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'data'], CONVERGENT_BILLER_SUMMARY_DATA);
      expect(Account.CurrentAccount(CUSTOM_STATE)).toBeNull();
    });

    test('It should return null when there is no currentAccount.', () => {
      const ACCOUNT_SUMMARY = {
        AccountNumber: '2'
      };
      const CONVERGENT_BILLER_SUMMARY_DATA = {
        AccountSummaries: [ACCOUNT_SUMMARY]
      };

      const CUSTOM_STATE = initializedStore
        .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'data'], CONVERGENT_BILLER_SUMMARY_DATA);
      expect(Account.CurrentAccount(CUSTOM_STATE)).toBeNull();
    });

    test('It should return null when there is no subscriber summary.', () => {
      const ACCOUNT_DATA = {
        currentAccount: '1'
      };

      const CUSTOM_STATE = initializedStore.setIn(['client', 'account'], ACCOUNT_DATA);
      expect(Account.CurrentAccount(CUSTOM_STATE)).toBeNull();
    });
  });

  describe('When the CurrentAccountIsManaged is used...', () => {
    test('It should return true when the current account has a subscriberId attribute.', () => {
      expect(Account.CurrentAccountIsManaged.resultFunc({
        subscriberId: 123
      })).toBeTruthy();
    });

    test('It should return false when the current account does not have a subscriberId attribute.', () => {
      expect(Account.CurrentAccountIsManaged.resultFunc({
        PrepaidDetails: 123
      })).toBeFalsy();
    });

    test('It should return false when there is no current account.', () => {
      expect(Account.CurrentAccountIsManaged.resultFunc(null)).toBeFalsy();
    });
  });

  describe('When the CurrentManagedAccountSubscriberId is used...', () => {
    test('It should return the subscriberId when the current account is managed.', () => {
      expect(Account.CurrentManagedAccountSubscriberId.resultFunc(true, {
        subscriberId: 123
      })).toBe(123);
    });

    test('It should return undefined when the current account is not managed.', () => {
      expect(Account.CurrentManagedAccountSubscriberId.resultFunc(false, {
        subscriberId: 123
      })).toBe(undefined);
    });
  });

  describe('When Services is used...', () => {
    test('It should return services without GUIDs', () => {
      expect(Account.Services.resultFunc(accountWithServices, {
        1: 177,
        2: 138
      }).length).toEqual(2);
    });
    test('It should return an empty array if there is not an account summary', () => {
      expect(Account.Services.resultFunc([], {})).toEqual([]);
    });
  });

  describe('When the SubscriberAndAccountsIsLoaded is used...', () => {
    test('It should return the value of the isRetrieveSubscriberAndAccountsLoaded attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'account', 'isRetrieveSubscriberAndAccountsLoaded'], true);
      expect(Account.SubscriberAndAccountsIsLoaded(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(Account.SubscriberAndAccountsIsLoaded()).toBe(false);
    });

    test('It should return false when there is no isRetrieveSubscriberAndAccountsLoaded attribute in the store.', () => {
      expect(Account.SubscriberAndAccountsIsLoaded({})).toBe(false);
    });
  });
});
