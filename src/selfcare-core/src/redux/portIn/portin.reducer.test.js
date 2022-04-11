import { PortInRequestTypes as types } from './portin.actions';
import reducer, { INITIAL_STATE } from './portin.reducer';

describe('Port In Reducer', () => {
  describe('UpdatePortInRequest.BEGIN', () => {
    test('It should set loading flag for port in', () => {
      const result = reducer(INITIAL_STATE, {
        type: types.UpdatePortInRequest.BEGIN,
        requestObject: {}
      });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('UpdatePortInRequest.SUCCESS', () => {
    let initState;
    let result;

    beforeEach(() => {
      initState = INITIAL_STATE.set('isLoading', true);
      result = reducer(initState, {
        type: types.UpdatePortInRequest.SUCCESS,
        payload: {},
        requestObject: {}
      });
    });

    test('It should unset loading flag for port in', () => {
      expect(result.isLoading).toBe(false);
    });
  });

  describe('CancelPortInRequest.BEGIN', () => {
    test('It should set loading flag for port in', () => {
      const result = reducer(INITIAL_STATE, {
        type: types.CancelPortInRequest.BEGIN,
        requestObject: {}
      });
      expect(result.isLoading).toBe(true);
    });
  });

  describe('CancelPortInRequest.SUCCESS', () => {
    let initState;
    let result;

    beforeEach(() => {
      initState = INITIAL_STATE.set('isLoading', true);
      result = reducer(initState, {
        type: types.CancelPortInRequest.SUCCESS,
        payload: {},
        requestObject: {}
      });
    });

    test('It should unset loading flag for port in', () => {
      expect(result.isLoading).toBe(false);
    });
  });
});
