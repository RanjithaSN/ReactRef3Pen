import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './usage.reducer';
import * as Usage from './usage.selectors';

const initializedStore = new Immutable({})
  .setIn(['client', 'usage'], INITIAL_STATE)
  .setIn(['client', 'account', 'currentAccount'], 1)
  .setIn(['ascendon', 'metadata', 'codes'], {})
  .setIn(['ascendon', 'configuration', 'data', 'defaultLocale'], 'en-US')
  .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'data', 'AccountSummaries'], [{
    AccountNumber: 1,
    Services: []
  }])
  .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'data', 'EntitlementBalances'], [{}]);

const withAccountSummary = new Immutable({})
  .setIn(['ascendon', 'metadata', 'codes', CODES.UnitOfMeasure], {
    status: LOADING_STATUS.LOADED,
    items: [{
      Value: 1,
      Name: 'Gigabyte',
      AdditionalProperties: {
        short_name: 'GB'
      }
    }]
  })
  .setIn(['client', 'usage', 'data', 'selectedService'], '1')
  .setIn(['client', 'account', 'currentAccount'], 1234)
  .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'data', 'AccountSummaries'], [{
    id: 1,
    AccountNumber: 1234,
    PrepaidDetails: {},
    Services: [
      {
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
          BalanceRemaining: 5.677,
          BalanceUnitCode: 1,
          ExpirationDate: new Date('2018-03-21T16:55:11.115Z')
        }]
      },
      {
        ServiceIdentifier: {
          Value: '89a7c1cd-2d49-4481-86b5-dc01f588d37e'
        },
        EntitlementBalances: []
      }]
  },
  {
    AccountNumber: 1254,
    PostpaidDetails: {
      Balance: 0,
      CurrencyCode: 'USD',
      DueDate: null
    }
  }])
  .setIn(['ascendon', 'configuration', 'data', 'defaultLocale'], 'en-US');

describe('Usage ', () => {
  describe('When AllServiceEntitlements is used', () => {
    test('It should return an empty array when the units of measure are not loaded', () => {
      expect(Usage.AllServiceEntitlements(initializedStore)).toEqual({});
    });
    test('It should return an empty array if there is not a service', () => {
      const CUSTOM_STATE = initializedStore
        .setIn(['ascendon', 'metadata', 'codes', CODES.UnitOfMeasure], {
          status: LOADING_STATUS.UNLOADED,
          items: []
        });
      expect(Usage.AllServiceEntitlements(CUSTOM_STATE)).toEqual({});
    });
    test('It should round the balance remaining to be 2 digits', () => {
      expect(Usage.AllServiceEntitlements(withAccountSummary)[1][0].BalanceConsumed).toEqual(2.25);
    });
    test('It should set the short name for the unit of measure on the entitlements', () => {
      expect(Usage.AllServiceEntitlements(withAccountSummary)[1][0].unitOfMeasure).toEqual('GB');
    });

    test('It should sort entitlements so last to expire is listed first', () => {
      const CUSTOM_STATE = withAccountSummary.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'accountInfo', 'summary', 'data', 'AccountSummaries', 0, 'Services', 0, 'EntitlementBalances'],
        [{
          BalanceConsumed: 666,
          BalanceRemaining: 5.674,
          BalanceUnitCode: 1,
          ExpirationDate: new Date('2017-03-21T16:55:11.115Z')
        }]);
      const result = Usage.AllServiceEntitlements(CUSTOM_STATE);

      // Even though we added 666 consumed to first entry, it should be sorted to second.
      expect(result[1][0].BalanceConsumed).toEqual(2.25);
      expect(result[2][0].BalanceConsumed).toEqual(666);
    });
  });
});
