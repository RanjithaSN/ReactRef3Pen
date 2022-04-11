
import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { SessionActionTypes } from '@selfcare/core/redux/session/session.actions';
import { ConvergentBillerActionTypes } from './convergent.biller.actions';
import { managedAccount, MANAGED_ACCOUNTS_INITIAL_STATE } from './convergent.biller.reducer';

describe('Create Subscriber Reducer', () => {
  describe('When ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS is dispatched...', () => {
    test('It should set loading to true on BEGIN', () => {
      const result = managedAccount(MANAGED_ACCOUNTS_INITIAL_STATE, {
        type: ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS.BEGIN
      });
      expect(result.isLoading).toEqual(true);
    });
    describe('It should set loading to true on SUCCESS', () => {
      let result;
      const payload = {
        SubscriberSummary: {
          SubscriberId: 'here'
        }
      };

      beforeEach(() => {
        result = managedAccount(MANAGED_ACCOUNTS_INITIAL_STATE, {
          type: ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS.SUCCESS,
          payload
        });
      });

      test('It should set loading to false', () => {
        expect(result.isLoading).toEqual(false);
      });

      test('It should set data to the paload', () => {
        expect(result.data).toEqual({
          [payload.SubscriberSummary.SubscriberId]: payload.SubscriberSummary
        });
      });

      test('It should add additional data to the paload when more info comes in', () => {
        const payload2 = {
          SubscriberSummary: {
            SubscriberId: 2,
            value: 'this is the second test case'
          }
        };
        result = managedAccount(result, {
          type: ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS.SUCCESS,
          payload: payload2
        });
        expect(result.data).toEqual({
          [payload.SubscriberSummary.SubscriberId]: payload.SubscriberSummary,
          [payload2.SubscriberSummary.SubscriberId]: payload2.SubscriberSummary
        });
      });
    });
    test('It should set loading to false on API error', () => {
      const result = managedAccount(MANAGED_ACCOUNTS_INITIAL_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS.BEGIN
        }
      });
      expect(result.isLoading).toEqual(false);
    });
    test('It should reset the state when subscriber session is closed', () => {
      const result = managedAccount(MANAGED_ACCOUNTS_INITIAL_STATE, {
        type: SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.BEGIN
      });
      expect(result).toEqual(MANAGED_ACCOUNTS_INITIAL_STATE);
    });
  });
});
