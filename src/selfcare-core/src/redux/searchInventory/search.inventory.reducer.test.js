import { FaultTypes } from '../fault/fault.actions';
import { SearchInventoryTypes as types } from './search.inventory.actions';
import reducer, { INITIAL_STATE } from './search.inventory.reducer';

describe('SearchInventory Reducer', () => {
  describe('When SearchInventoryTypes.SEARCH_MSISDN_INVENTORY.BEGIN is dispatched', () => {
    test('It should set isLoading to true.', () => {
      const state = reducer(INITIAL_STATE, {
        type: types.SEARCH_MSISDN_INVENTORY.BEGIN
      });
      expect(state.isLoading).toBe(true);
    });
  });

  describe('When SearchInventoryTypes.SEARCH_MSISDN_INVENTORY.SUCCESS is dispatched', () => {
    const payload = {
      InventoryItems: {
        Item1: 'something',
        Item2: 'something else'
      }
    };

    const result = reducer(
      INITIAL_STATE.set('isLoading', true),
      {
        type: types.SEARCH_MSISDN_INVENTORY.SUCCESS,
        payload
      }
    );

    test('It should set isLoading to false.', () => {
      expect(result.isLoading).toBe(false);
    });

    test('It should set the MSISDN sub-object to the payloads InventoryItems.', () => {
      expect(result.data.MSISDN).toEqual(payload.InventoryItems);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched', () => {
    describe('When the trigger is SearchInventoryTypes.SEARCH_MSISDN_INVENTORY.BEGIN', () => {
      test('It should set isLoading to false.', () => {
        const state = reducer(
          INITIAL_STATE.set('isLoading', true),
          {
            type: FaultTypes.API_FAULT,
            payload: {
              trigger: types.SEARCH_MSISDN_INVENTORY.BEGIN
            }
          }
        );
        expect(state.isLoading).toBe(false);
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

  describe('When SearchInventoryTypes.CLEAR_MSISDN_INVENTORY is dispatched', () => {
    const data = {
      MSISDN: {
        Item1: 'something',
        Item2: 'something else'
      }
    };

    const result = reducer(
      INITIAL_STATE.set('isLoading', true).set('data', data),
      {
        type: types.CLEAR_MSISDN_INVENTORY
      }
    );

    test('It should set isLoading to false.', () => {
      expect(result.isLoading).toBe(false);
    });

    test('It should set the MSISDN sub-object to be undefined.', () => {
      expect(result.data.MSISDN).toEqual(undefined);
    });
  });
});
