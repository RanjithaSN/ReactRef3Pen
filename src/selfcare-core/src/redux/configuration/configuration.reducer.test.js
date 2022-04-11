import reducer, { INITIAL_STATE } from './configuration.reducer';
import { ConfigurationActionTypes } from './configuration.actions';

describe('Configuration Reducer', () => {
  describe('When ConfigurationActionTypes.RetrieveConfiguration.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConfigurationActionTypes.RetrieveConfiguration.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should set the data attribute to null.', () => {
      expect(response.data).toBeNull();
    });
  });

  describe('When ConfigurationActionTypes.RetrieveConfiguration.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      id: 1
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConfigurationActionTypes.RetrieveConfiguration.SUCCESS,
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

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });
});
