import { FaultTypes } from '../fault/fault.actions';
import { SessionActionTypes } from '../session/session.actions';
import { ConvergentBillerSummaryActionTypes } from './convergent.biller.summary.actions';
import { managedAccounts, MANAGED_INITIAL_STATE, summary, SUMMARY_INITIAL_STATE } from './convergent.biller.summary.reducer';

describe('Convergent Biller Reducer', () => {
  describe('When using the summary reducer', () => {
    describe('When ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.BEGIN is dispatched...', () => {
      let response;

      beforeEach(() => {
        response = summary(SUMMARY_INITIAL_STATE, {
          type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.BEGIN
        });
      });

      test('It should set the isLoading flag to true.', () => {
        expect(response.isLoading).toBe(true);
      });

      test('It should set accountsNeedRefreshed to false', () => {
        expect(response.accountsNeedRefreshed).toBe(false);
      });
    });

    describe('When ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS is dispatched...', () => {
      let response;
      const payload = {
        SubscriberSummary: {
          accountNumber: 18123
        }
      };

      test('It should set the isLoading flag to false.', () => {
        const CUSTOM_STATE = SUMMARY_INITIAL_STATE.set('isLoading', true);
        response = summary(CUSTOM_STATE, {
          type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS,
          payload
        });
        expect(response.isLoading).toBe(false);
        expect(response.accountsNeedRefreshed).toBe(false);
      });

      test('It should set the data to the payload.', () => {
        response = summary(SUMMARY_INITIAL_STATE, {
          type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS,
          payload
        });
        expect(response.data).toEqual(payload.SubscriberSummary);
      });
    });

    describe('When FaultTypes.API_FAULT is dispatched...', () => {
      test('It should set the isLoading to false when the trigger is the ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.BEGIN action.', () => {
        const CUSTOM_STATE = SUMMARY_INITIAL_STATE.set('isLoading', true);
        const response = summary(CUSTOM_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.BEGIN
          }
        });

        expect(response.isLoading).toBe(false);
      });

      test('It should return the state passed to the reducer for any other fault.', () => {
        const response = summary(SUMMARY_INITIAL_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: 'some other action'
          }
        });

        expect(response).toBe(SUMMARY_INITIAL_STATE);
      });
    });
    test('It should set accountsNeedRefreshed in the state when the action is called', () => {
      const result = summary(SUMMARY_INITIAL_STATE, {
        type: ConvergentBillerSummaryActionTypes.CLEAR_CONVERGENT_BILLER_ACCOUNT
      });
      expect(result.accountsNeedRefreshed).toBe(true);
    });

    describe('When any other action is dispatched...', () => {
      test('It should return the state passed to the reducer.', () => {
        const response = summary(SUMMARY_INITIAL_STATE, {
          type: 'some other type'
        });

        expect(response).toBe(SUMMARY_INITIAL_STATE);
      });
    });

    describe('When SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.BEGIN action is dispatched...', () => {
      test('It should return the initial state passed to the reducer.', () => {
        const CUSTOM_STATE = SUMMARY_INITIAL_STATE.set('value', false);
        const response = summary(CUSTOM_STATE, {
          type: SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.BEGIN
        });

        expect(response).toBe(SUMMARY_INITIAL_STATE);
      });
    });
  });
  describe('When using the managedAccounts reducer', () => {
    describe('When ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.BEGIN is dispatched...', () => {
      test('It should set the isLoading flag to true.', () => {
        const response = managedAccounts(MANAGED_INITIAL_STATE, {
          type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.BEGIN
        });
        expect(response.isLoading).toBe(true);
      });
    });

    describe('When ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS is dispatched...', () => {
      let response;
      const payload = {
        SubscriberAccounts: [{
          AccountNumber: 18123,
          SubscriberId: 12
        }]
      };
      const result = {
        [payload.SubscriberAccounts[0].SubscriberId]: payload.SubscriberAccounts[0]
      };

      test('It should set the isLoading flag to false.', () => {
        const CUSTOM_STATE = MANAGED_INITIAL_STATE.set('isLoading', true);
        response = managedAccounts(CUSTOM_STATE, {
          type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS,
          payload
        });
        expect(response.isLoading).toBe(false);
      });

      test('It should set the data to the payload.', () => {
        response = managedAccounts(MANAGED_INITIAL_STATE, {
          type: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS,
          payload
        });
        expect(response.data).toEqual(result);
      });
    });

    describe('When FaultTypes.API_FAULT is dispatched...', () => {
      test('It should set the isLoading to false when the trigger is the ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.BEGIN action.', () => {
        const CUSTOM_STATE = MANAGED_INITIAL_STATE.set('isLoading', true);
        const response = managedAccounts(CUSTOM_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.BEGIN
          }
        });

        expect(response.isLoading).toBe(false);
      });

      test('It should return the state passed to the reducer for any other fault.', () => {
        const response = managedAccounts(MANAGED_INITIAL_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: 'some other action'
          }
        });

        expect(response).toEqual(MANAGED_INITIAL_STATE);
      });
    });

    describe('When any other action is dispatched...', () => {
      test('It should return the state passed to the reducer.', () => {
        const response = managedAccounts(MANAGED_INITIAL_STATE, {
          type: 'some other type'
        });

        expect(response).toBe(MANAGED_INITIAL_STATE);
      });
    });

    describe('When SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.BEGIN action is dispatched...', () => {
      test('It should return the initial state passed to the reducer.', () => {
        const CUSTOM_STATE = MANAGED_INITIAL_STATE.set('value', false);
        const response = managedAccounts(CUSTOM_STATE, {
          type: SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.BEGIN
        });

        expect(response).toEqual(MANAGED_INITIAL_STATE);
      });
    });
  });
});
