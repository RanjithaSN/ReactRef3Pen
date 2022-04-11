import { CONFIGURATION } from '@selfcare/core/constants/configuration.constants';
import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './convergent.biller.account.usage.details.reducer';
import * as ConvergentBillerAccountUsageDetails from './convergent.biller.account.usage.details.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      convergentBiller: {
        usageDetails: INITIAL_STATE
      }
    }
  }
});

describe('ConvergentBillerAccountUsageDetails ', () => {
  describe('When the ConvergentBillerAccountUsageLoading is used...', () => {
    test('It should return the value of the status attribute when one exists.', () => {
      const DATA = LOADING_STATUS.LOADING;
      const SERVICE_ID = '456456';
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'usageDetails', 'status', SERVICE_ID], DATA);
      expect(ConvergentBillerAccountUsageDetails.ConvergentBillerAccountUsageLoading(CUSTOM_STATE)).toEqual({
        [SERVICE_ID]: DATA
      });
    });

    test('It should return an empty object when there is no store passed in.', () => {
      expect(ConvergentBillerAccountUsageDetails.ConvergentBillerAccountUsageLoading()).toEqual({});
    });
  });

  describe('When the ConvergentBillerAccountUsageItems is used...', () => {
    test('It should return the value of the usageItems attribute when one exists.', () => {
      const SERVICE_ID = '456456';
      const DATA = [{
        id: 1
      }];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'usageDetails', 'usageItems', SERVICE_ID], DATA);
      expect(ConvergentBillerAccountUsageDetails.ConvergentBillerAccountUsageItems(CUSTOM_STATE)).toEqual({
        [SERVICE_ID]: DATA
      });
    });

    test('It should return an empty array when there is no store passed in.', () => {
      expect(ConvergentBillerAccountUsageDetails.ConvergentBillerAccountUsageItems()).toEqual({});
    });

    test('It should return an empty array when there is no data attribute in the store.', () => {
      expect(ConvergentBillerAccountUsageDetails.ConvergentBillerAccountUsageItems.resultFunc({})).toEqual({});
    });
  });
  describe('When AllowancesAcrossProducts is used...', () => {
    test('It should return an empty array when no allowance entitlements are found', () => {
      expect(ConvergentBillerAccountUsageDetails.AllowancesAcrossProducts.resultFunc({}, [], null)).toEqual([]);
    });
    test('It should return a filtered list of just entitlement of allowance type', () => {
      const SERVICE_ID_1 = '23432313';
      const SERVICE_ID_2 = '23432342342313';
      const usageItems = {
        [SERVICE_ID_1]: [{
          EntitlementName: CONFIGURATION.ALLOWANCE_ENTITLEMENT_NAME,
          NetworkEventTypeCode: 1,
          EventStartTime: new Date().toString(),
          Sender: 'me_1',
          Receiver: 'you_1',
          UsageAmount: 10
        }, {
          EntitlementName: 'Something Else'
        }],
        [SERVICE_ID_2]: [{
          EntitlementName: CONFIGURATION.ALLOWANCE_ENTITLEMENT_NAME,
          NetworkEventTypeCode: 1,
          EventStartTime: new Date().toString(),
          Sender: 'me_2',
          Receiver: 'you_1',
          UsageAmount: 19
        }, {
          EntitlementName: CONFIGURATION.ALLOWANCE_ENTITLEMENT_NAME,
          NetworkEventTypeCode: 1,
          EventStartTime: new Date().toString(),
          Sender: 'me_2',
          Receiver: 'you_2',
          UsageAmount: 15
        }, {
          EntitlementName: CONFIGURATION.ALLOWANCE_ENTITLEMENT_NAME,
          NetworkEventTypeCode: 1,
          EventStartTime: new Date().toString(),
          Sender: 'me_2',
          Receiver: 'you_1',
          UsageAmount: 12
        }, {
          EntitlementName: 'Something Else'
        }]
      };
      const networkEventType = [{
        Value: 1,
        Name: 'Event Name'
      }];
      const response = ConvergentBillerAccountUsageDetails.AllowancesAcrossProducts.resultFunc(usageItems, networkEventType, 'en-US');
      expect(response.length).toBe(4);
    });
  });
});
