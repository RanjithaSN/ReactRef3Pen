import reducer, { INITIAL_STATE } from './convergent.biller.account.details.reducer';
import { ConvergentBillerAccountDetailsTypes } from './convergent.biller.account.details.actions';
import { FaultTypes } from '../fault/fault.actions';

describe('ConvergentBillerAccountDetails Reducer', () => {
  describe('When ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should set the data attribute to null.', () => {
      expect(response.data).toBeNull();
    });
  });

  describe('When ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      id: 1
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.SUCCESS,
        payload
      });
    });

    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should set the data attribute to the payload of the action.', () => {
      expect(response.data).toEqual(payload);
    });
  });

  describe('WHen FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS.BEGIN
        }
      });

      expect(response.isLoading).toBe(false);
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
