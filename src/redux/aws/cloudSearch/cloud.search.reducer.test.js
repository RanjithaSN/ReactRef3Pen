import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { CloudSearchTypes } from './cloud.search.actions';
import reducer, { INITIAL_STATE } from './cloud.search.reducer';

describe('SubscriberOfferings Reducer', () => {
  describe('When CloudSearchTypes.FetchSearchResults.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: CloudSearchTypes.FetchSearchResults.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });

  describe('When CloudSearchTypes.FetchSearchResults.SUCCESS is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: CloudSearchTypes.FetchSearchResults.SUCCESS,
        payload: {
          hits: {
            hit: [{
              Id: 1
            }]
          }
        }
      });
    });

    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should set the data attribute to the payload of the action.', () => {
      expect(response.searchResults).toEqual([{
        Id: 1
      }]);
    });
  });

  describe('When CloudSearchTypes.CLEAR_SEARCH_RESULTS...', () => {
    test('it should return to initial state', () => {
      const state = reducer(
        INITIAL_STATE.setIn(['searchResults'], [{
          id: 1
        }]),
        {
          type: CloudSearchTypes.ClearSearchResults
        }
      );

      expect(state).toEqual(INITIAL_STATE);
    });
  });

  describe('WHen FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the CloudSearchTypes.RetrieveSearchResults.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: CloudSearchTypes.FetchSearchResults.BEGIN
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
