import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import { ACCOUNT_CHANGED } from '../account/account.action.constants';
import { FaultTypes } from '../fault/fault.actions';
import { ConvergentBillerAccountUsageDetailsTypes } from './convergent.biller.account.usage.details.actions';
import reducer, { INITIAL_STATE } from './convergent.biller.account.usage.details.reducer';

describe('ConvergentBillerBillCycleDetailsReducer Reducer', () => {
  describe('When ACCOUNT_CHANGED is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE.set('isLoading', true).set('entitlementBalances', 'entitlementBalances').set('usageItems', 'usageItems'), {
        type: ACCOUNT_CHANGED
      });
    });

    test('It should set back to Initial state.', () => {
      expect(response.isLoading).toBe(INITIAL_STATE.isLoading);
      expect(response.entitlementBalances).toBe(INITIAL_STATE.entitlementBalances);
      expect(response.usageItems).toBe(INITIAL_STATE.usageItems);
    });
  });
  describe('When ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.BEGIN is dispatched...', () => {
    let response;
    const serviceId = '234234';

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.BEGIN,
        requestObject: {
          ServiceIdentifier: {
            Value: serviceId
          }
        }
      });
    });

    test('It should set the status flag to Loading.', () => {
      expect(response.status[serviceId]).toBe(LOADING_STATUS.LOADING);
    });

    test('It should set the data attribute to null.', () => {
      expect(response.entitlementBalances).toBeNull();
      expect(response.usageItems[serviceId]).toBeNull();
    });
  });

  describe('When ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.SUCCESS is dispatched...', () => {
    let response;
    const serviceId = '234234';
    const payload = {
      EntitlementBalances: [{
        id: 11
      }, {
        id: 12
      }],
      UsageItems: [{
        id: 21
      }, {
        id: 22
      }, {
        id: 23
      }]
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.SUCCESS,
        payload,
        requestObject: {
          ServiceIdentifier: {
            Value: serviceId
          }
        }
      });
    });

    test('It should set the status flag to LOADeD.', () => {
      expect(response.status[serviceId]).toBe(LOADING_STATUS.LOADED);
    });

    test('It should set the entitlementBalances attribute to the Entitlement Balances attribute of the payload of the action.', () => {
      expect(response.entitlementBalances).toEqual(payload.EntitlementBalances);
    });

    test('It should set the usageItems attribute to the Usage Items attribute of the payload of the action.', () => {
      expect(response.usageItems[serviceId]).toEqual(payload.UsageItems);
    });
  });

  describe('When ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS.BEGIN
      });
    });

    test('It should set the allProductsUsageIsLoading flag to true.', () => {
      expect(response.allProductsUsageIsLoading).toBe(true);
    });
  });

  describe('When ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS.SUCCESS is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS.SUCCESS
      });
    });

    test('It should set the allProductsUsageIsLoading flag to false.', () => {
      expect(response.allProductsUsageIsLoading).toBe(false);
    });
  });

  describe('WHen FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the status attribute to be Unloaded when the trigger is the ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.BEGIN action.', () => {
      const serviceId = '234234';
      const CUSTOM_STATE = INITIAL_STATE.setIn(['status', serviceId], LOADING_STATUS.LOADING);

      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.BEGIN
        },
        requestObject: {
          ServiceIdentifier: {
            Value: serviceId
          }
        }
      });

      expect(response.status[serviceId]).toBe(LOADING_STATUS.UNLOADED);
    });

    test('It should return the state passed to the reducer for any other fault.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: 'some other action'
        }
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });
});
