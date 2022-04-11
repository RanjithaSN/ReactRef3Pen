import { FaultTypes } from '../fault/fault.actions';
import { SubscriberInventoryTypes } from './subscriber.inventory.actions';
import reducer, { INITIAL_STATE } from './subscriber.inventory.reducer';

describe('SubscriberInventory Reducer', () => {
  describe('When SubscriberInventoryTypes.SearchSubscriberInventory.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubscriberInventoryTypes.SearchSubscriberInventory.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should set the data attribute to null.', () => {
      expect(response.data).toBeNull();
    });
  });

  describe('When SubscriberInventoryTypes.SearchSubscriberInventory.SUCCESS is dispatched...', () => {
    let response;
    const SubscriberInventory = [{
      id: 1
    }];

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SubscriberInventoryTypes.SearchSubscriberInventory.SUCCESS,
        payload: {
          SubscriberInventory
        }
      });
    });

    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should set the data attribute to the payload of the action.', () => {
      expect(response.data).toEqual({
        SubscriberInventory
      });
    });
  });

  describe('WHen FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the SubscriberInventoryTypes.SearchSubscriberInventory.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SubscriberInventoryTypes.SearchSubscriberInventory.BEGIN
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
