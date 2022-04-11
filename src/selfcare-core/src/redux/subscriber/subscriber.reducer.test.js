import { FaultTypes } from '../fault/fault.actions';
import { SubscriberTypes } from './subscriber.actions';
import reducer, { INITIAL_STATE } from './subscriber.reducer';

describe('Subscriber Reducer', () => {
  describe('When SubscriberTypes.RetrieveSubscriber.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubscriberTypes.RetrieveSubscriber.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should set the data attribute to null.', () => {
      expect(response.data).toBeNull();
    });
  });

  describe('When SubscriberTypes.RetrieveSubscriber.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      Subscriber: {
        id: 1
      }
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubscriberTypes.RetrieveSubscriber.SUCCESS,
        payload
      });
    });

    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should set the data attribute to the Subscriber attribute of the payload of the action.', () => {
      expect(response.data).toEqual(payload);
    });
  });

  describe('WHen FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the RetrieveSubscriber.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SubscriberTypes.RetrieveSubscriber.BEGIN
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

  describe('UpdateSubscriber actions', () => {
    test('It should set the isUpdating flag to true when updating a subscriber begins', () => {
      const response = reducer(INITIAL_STATE, {
        type: SubscriberTypes.UpdateSubscriber.BEGIN
      });
      expect(response.isUpdating).toBe(true);
    });
    test('It should set the data of the store as the response from update subscriber with the updated subscriber', () => {
      const PAYLOAD = {
        Subscriber: {
          Name: 'Bob Dole'
        }
      };
      const response = reducer(INITIAL_STATE, {
        type: SubscriberTypes.UpdateSubscriber.SUCCESS,
        payload: PAYLOAD
      });
      expect(response.data).toEqual(PAYLOAD);
    });
    test('It should set the isUpdating flag to false in the event of the update call succeeding', () => {
      const BASE_STATE = INITIAL_STATE.set('isUpdating', true);
      const response = reducer(BASE_STATE, {
        type: SubscriberTypes.UpdateSubscriber.SUCCESS
      });
      expect(response.isUpdating).toBe(false);
    });
    test('It should set the isCreating flag to false if the create subscriber call fails', () => {
      const BASE_STATE = INITIAL_STATE.set('isUpdating', true);
      const response = reducer(BASE_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SubscriberTypes.UpdateSubscriber.BEGIN
        }
      });
      expect(response.isUpdating).toBe(false);
    });
  });
  describe('UpdateCredentials actions', () => {
    test('It should set the isUpdating flag to true when updating a subscriber begins', () => {
      const response = reducer(INITIAL_STATE, {
        type: SubscriberTypes.UpdateCredentials.BEGIN
      });
      expect(response.isUpdating).toBe(true);
    });
    test('It should set the isUpdating flag to false in the event of the update call succeeding', () => {
      const BASE_STATE = INITIAL_STATE.set('isUpdating', true);
      const response = reducer(BASE_STATE, {
        type: SubscriberTypes.UpdateCredentials.SUCCESS
      });
      expect(response.isUpdating).toBe(false);
    });
    test('It should set the isCreating flag to false if the create subscriber call fails', () => {
      const BASE_STATE = INITIAL_STATE.set('isUpdating', true);
      const response = reducer(BASE_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SubscriberTypes.UpdateCredentials.BEGIN
        }
      });
      expect(response.isUpdating).toBe(false);
    });
  });
});
