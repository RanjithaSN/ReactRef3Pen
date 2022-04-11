import path from 'ramda/src/path';
import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SearchServicesTypes as types } from './search.services.actions';
import reducer from './search.services.reducer';

describe('SearchServices Reducer', () => {
  describe('When SearchServicesTypes.SearchServices.BEGIN is dispatched', () => {
    test('It should set isLoading to true.', () => {
      const state = reducer(undefined, {
        type: types.SearchServices.BEGIN
      });
      expect(state.isLoading).toBe(true);
    });
  });

  describe('When SearchServicesTypes.SearchServices.SUCCESS is dispatched', () => {
    const payload = {
      ServiceThumbnails: [{
        ServiceIdentifier: 'myphonenumber'
      }]
    };
    let state;

    beforeEach(() => {
      const INITIAL_STATE = new Immutable({});
      state = reducer(
        INITIAL_STATE.set('isLoading', true),
        {
          type: types.SearchServices.SUCCESS,
          payload
        }
      );
    });

    test('It should set isLoading to false.', () => {
      expect(state.isLoading).toBe(false);
    });

    test('It should set the service identifiers into a list.', () => {
      expect(state.data).toEqual({
        [path(['ServiceThumbnails', 0, 'ServiceIdentifier'], payload)]: payload
      });
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched', () => {
    describe('When the trigger is SearchServicesTypes.SearchServices.BEGIN', () => {
      test('It should set isLoading to false.', () => {
        const INITIAL_STATE = new Immutable({});
        const state = reducer(
          INITIAL_STATE.set('isLoading', true),
          {
            type: FaultTypes.API_FAULT,
            payload: {
              trigger: types.SearchServices.BEGIN
            }
          }
        );
        expect(state.isLoading).toBe(false);
      });
    });
    describe('When the trigger is Another_Action for APIFault, do nothing', () => {
      test('It should set isLoading to false.', () => {
        const INITIAL_STATE = new Immutable({});
        const state = reducer(
          INITIAL_STATE.set('isLoading', true),
          {
            type: FaultTypes.API_FAULT,
            payload: {
              trigger: 'Another_Action'
            }
          }
        );
        expect(state.isLoading).toBe(true);
      });
    });
  });
});
