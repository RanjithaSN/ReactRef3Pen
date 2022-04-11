import { FaultTypes } from '../fault/fault.actions';
import { FeasibilityTypes } from './feasibility.actions';
import reducer, { INITIAL_STATE } from './feasibility.reducer';

describe('Device Reducer', () => {
  describe('Feasibilitytypes', () => {
    test('When CLEAR_ADDRESSES is dispatched the state for addresses should go to null', () => {
      const state = reducer(
        INITIAL_STATE.setIn(['data', 'addresses'], 'A Value'),
        {
          type: FeasibilityTypes.CLEAR_ADDRESSES
        }
      );

      expect(state.data.addresses).toBe(null);
    });
    test('When FETCH_ADDRESS.BEGIN is dispatched the loading state should be updated', () => {
      const state = reducer(
        INITIAL_STATE.setIn(['data', 'feasibilityAddress'], 'A Value'),
        {
          type: FeasibilityTypes.FETCH_ADDRESS.BEGIN
        }
      );

      expect(state.data.feasibilityAddress).toBe(null);
      expect(state.isLoading).toBe(true);
    });
    test('When FETCH_ADDRESS.SUCCESS is dispatched the loading state should be updated', () => {
      const state = reducer(
        INITIAL_STATE.set('isLoading', true),
        {
          type: FeasibilityTypes.FETCH_ADDRESS.SUCCESS,
          payload: {
            field: 'someValue'
          }
        }
      );

      expect(state.data.feasibilityAddress).toEqual({
        field: 'someValue'
      });
      expect(state.isLoading).toBe(false);
    });
    test('When FETCH_ADDRESSES.BEGIN is dispatched the loading state should be updated', () => {
      const state = reducer(
        INITIAL_STATE.setIn(['data', 'addresses'], 'A Value'),
        {
          type: FeasibilityTypes.FETCH_ADDRESSES.BEGIN
        }
      );

      expect(state.data.addresses).toBe(null);
      expect(state.isLoading).toBe(true);
    });
    test('When FETCH_ADDRESSES.SUCCESS is dispatched the loading state should be updated', () => {
      const state = reducer(
        INITIAL_STATE.set('isLoading', true),
        {
          type: FeasibilityTypes.FETCH_ADDRESSES.SUCCESS,
          payload: {
            field: 'someValue'
          }
        }
      );

      expect(state.data.addresses).toEqual({
        field: 'someValue'
      });
      expect(state.isLoading).toBe(false);
    });
    test('When RETRIEVE_SUBSCRIBER_OFFERS.BEGIN is dispatched the loading state should be updated', () => {
      const state = reducer(
        INITIAL_STATE.setIn(['data', 'offers'], 'A Value').setIn(['data', 'attributes'], 'Another Value'),
        {
          type: FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.BEGIN
        }
      );

      expect(state.data.offers).toStrictEqual([]);
      expect(state.data.attributes).toBe(null);
      expect(state.isLoading).toBe(true);
    });
    test('When RETRIEVE_SUBSCRIBER_OFFERS.SUCCESS is dispatched the loading state should be updated, payload set to offers, and requestObject set to attributes', () => {
      const state = reducer(
        INITIAL_STATE.set('isLoading', true),
        {
          type: FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.SUCCESS,
          payload: {
            field: 'someValue'
          },
          requestObject: {
            anotherField: 'anotherValue'
          }
        }
      );

      expect(state.data.offers).toEqual({
        field: 'someValue'
      });
      expect(state.data.attributes).toEqual({
        anotherField: 'anotherValue'
      });
      expect(state.isLoading).toBe(false);
    });
    test('When SET_FEASIBILITY_SERVICE_ID is dispatched the state for service id attriute should update', () => {
      const state = reducer(
        INITIAL_STATE,
        {
          type: FeasibilityTypes.SET_FEASIBILITY_SERVICE_ID,
          payload: 17645
        }
      );

      expect(state.data.attributes.serviceId).toBe(17645);
    });
    describe('When FaultTypes.API_FAULT is dispatched...', () => {
      test('It should set the isLoading attribute to false and clear out addresses when the trigger is the FeasibilityTypes.FETCH_ADDRESS.BEGIN action.', () => {
        const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).setIn(['data', 'feasibilityAddress'], 123);
        const response = reducer(CUSTOM_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: FeasibilityTypes.FETCH_ADDRESS.BEGIN
          }
        });

        expect(response.data.feasibilityAddress).toBe(null);
        expect(response.isLoading).toBe(false);
      });
      test('It should set the isLoading attribute to false and clear out addresses when the trigger is the FeasibilityTypes.FETCH_ADDRESSES.BEGIN action.', () => {
        const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).setIn(['data', 'addresses'], 123);
        const response = reducer(CUSTOM_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: FeasibilityTypes.FETCH_ADDRESSES.BEGIN
          }
        });

        expect(response.data.addresses).toBe(null);
        expect(response.isLoading).toBe(false);
      });
      test('It should set the isLoading attribute to false when the trigger is the FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.BEGIN action.', () => {
        const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).setIn(['data', 'offers'], 234).setIn(['data', 'attributes'], {
          test: 1
        });
        const response = reducer(CUSTOM_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.BEGIN
          }
        });

        expect(response.data.attributes).toBe(null);
        expect(response.data.offers).toStrictEqual([]);
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
  });
});
