import reducer, { INITIAL_STATE } from './fault.reducer';
import { FaultTypes } from './fault.actions';

describe('Fault Reducer', () => {
  describe('When @@router/LOCATION_CHANGE is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE.set('data', {}), {
        type: '@@router/LOCATION_CHANGE'
      });
    });

    test('It should set the data attribute to the payload.', () => {
      expect(response.data).toBeNull();
    });
  });
  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    const payload = {
      Code: 123,
      Message: 'Oh Noes!'
    };
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: FaultTypes.API_FAULT,
        payload
      });
    });

    test('It should set the data attribute to the payload.', () => {
      expect(response.data).toEqual(payload);
    });
  });

  describe('When FaultTypes.CLEAR_API_FAULT is dispatched...', () => {
    test('It should set the data attribute back to null.', () => {
      const CUSTOM_STORE = INITIAL_STATE.set('data', {
        id: 1
      });
      const response = reducer(CUSTOM_STORE, {
        type: FaultTypes.CLEAR_API_FAULT
      });
      expect(response.data).toBeNull();
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
