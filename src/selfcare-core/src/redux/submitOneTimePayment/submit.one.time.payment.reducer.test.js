import reducer, { INITIAL_STATE } from './submit.one.time.payment.reducer';
import { SubmitOneTimePaymentTypes } from './submit.one.time.payment.actions';
import { FaultTypes } from '../fault/fault.actions';

describe('SubmitOneTimePayment Reducer', () => {
  describe('When SubmitOneTimePaymentTypes.SubmitPaymentRetry.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubmitOneTimePaymentTypes.SubmitPaymentRetry.BEGIN
      });
    });

    test('It should set the data attribute to null.', () => {
      expect(response.data).toBeNull();
    });
  });

  describe('WHen FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the SubmitOneTimePaymentTypes.SubmitPaymentRetry.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SubmitOneTimePaymentTypes.SubmitPaymentRetry.BEGIN
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

  describe('When @@router/LOCATION_CHANGE is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE.set('data', {}), {
        type: '@@router/LOCATION_CHANGE'
      });
    });

    test('It should set the data attribute to null', () => {
      expect(response.data).toBeNull();
    });
  });
});
