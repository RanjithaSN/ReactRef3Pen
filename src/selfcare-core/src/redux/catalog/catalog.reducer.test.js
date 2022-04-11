import { FaultTypes } from '../fault/fault.actions';
import { CatalogTypes } from './catalog.actions';
import reducer, { INITIAL_STATE } from './catalog.reducer';

describe('Catalog Reducer', () => {
  describe('When CatalogTypes.SearchCatalog.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: CatalogTypes.SearchCatalog.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should set the data attribute to null.', () => {
      expect(response.data).toBeNull();
    });
  });

  describe('When CatalogTypes.SearchCatalog.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      SearchResults: [{
        id: 1,
        name: 'SearchResult 1'
      }]
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: CatalogTypes.SearchCatalog.SUCCESS,
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

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the CatalogTypes.SearchCatalog.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: CatalogTypes.SearchCatalog.BEGIN
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
