import { FaultTypes } from '../fault/fault.actions';
import { SubscriberInformationTypes } from './subscriber.information.actions';
import reducer, { INITIAL_STATE } from './subscriber.information.reducer';

describe('SubscriberInformationReducer', () => {
  describe('When FETCH_SSN_INFORMATION.BEGIN is dispatched', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubscriberInformationTypes.FETCH_SSN_INFORMATION.BEGIN
      });
    });

    test('data should be set to null.', () => {
      expect(response.data.ssnLookup).toEqual(null);
    });

    test('isLoading should be true', () => {
      expect(response.isLoading).toEqual(true);
    });
  });

  describe('When FETCH_SSN_INFORMATION.SUCCESS is dispatched', () => {
    let response;
    const payload = {
      ssn: '19901212-1234',
      otherData: 'I\'m from Sweden!'
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubscriberInformationTypes.FETCH_SSN_INFORMATION.SUCCESS,
        payload
      });
    });

    test('It should set the ssnLookup data to the payload.', () => {
      expect(response.data.ssnLookup).toEqual(payload);
    });

    test('isLoading should be false.', () => {
      expect(response.isLoading).toEqual(false);
    });
  });
  describe('When UPDATE_SUBSCRIBER_SSN_INFORMATION.BEGIN is dispatched', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubscriberInformationTypes.UPDATE_SUBSCRIBER_SSN_INFORMATION.BEGIN
      });
    });

    test('updateSubscriberLoading should be true', () => {
      expect(response.updateSubscriberLoading).toEqual(true);
    });
  });

  describe('When UPDATE_SUBSCRIBER_SSN_INFORMATION.SUCCESS is dispatched', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubscriberInformationTypes.UPDATE_SUBSCRIBER_SSN_INFORMATION.SUCCESS
      });
    });

    test('updateSubscriberLoading should be false.', () => {
      expect(response.updateSubscriberLoading).toEqual(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the FETCH_SSN_INFORMATION.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SubscriberInformationTypes.FETCH_SSN_INFORMATION.BEGIN
        }
      });

      expect(response.isLoading).toBe(false);
    });
    test('It should set the isLoading attribute to false when the trigger is the UPDATE_SUBSCRIBER_SSN_INFORMATION.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('updateSubscriberLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SubscriberInformationTypes.UPDATE_SUBSCRIBER_SSN_INFORMATION.BEGIN
        }
      });

      expect(response.updateSubscriberLoading).toBe(false);
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
