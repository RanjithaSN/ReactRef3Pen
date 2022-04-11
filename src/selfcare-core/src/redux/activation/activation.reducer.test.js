import { FaultTypes } from '../fault/fault.actions';
import { ActivationTypes } from './activation.actions';
import reducer, { INITIAL_STATE } from './activation.reducer';

describe('Activation Reducer', () => {
  describe('When ActivationTypes.FixedActivationRequest.BEGIN is dispatched...', () => {
    const response = reducer(INITIAL_STATE.setIn(['data', 'status'], 123), {
      type: ActivationTypes.FixedActivationRequest.BEGIN
    });

    test('It should set the isLoading flag to true and data status attribute to null.', () => {
      expect(response.isLoading).toBe(true);
      expect(response.data.status).toBeNull();
    });
  });

  describe('When ActivationTypes.FixedActivationRequest.SUCCESS is dispatched...', () => {
    const payload = {
      id: 1
    };

    const response = reducer(INITIAL_STATE.set('isLoading', true), {
      type: ActivationTypes.FixedActivationRequest.SUCCESS,
      payload
    });

    test('It should set the isLoading flag to false and data attribute to the payload of the action.', () => {
      expect(response.isLoading).toBe(false);
      expect(response.data.status).toEqual(payload);
    });
  });

  describe('WHen FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the ActivationTypes.FixedActivationRequest.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).setIn(['data', 'status'], 1234);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: ActivationTypes.FixedActivationRequest.BEGIN
        }
      });

      expect(response.isLoading).toBe(false);
      expect(response.data.status).toBeNull();
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
