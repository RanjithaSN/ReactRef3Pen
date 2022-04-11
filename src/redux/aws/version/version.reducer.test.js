import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { VersionTypes } from './version.actions';
import reducer, { INITIAL_STATE } from './version.reducer';

describe('Version Reducer', () => {
  describe('When VersionTypes.RetrieveVersionInformation.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: VersionTypes.RetrieveVersionInformation.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });
  describe('When VersionTypes.RetrieveVersionInformation.SUCCESS is dispatched...', () => {
    const emptyPayload = [{}];
    const payload = [{
      ID: 50,
      post_title: 'How do I do something?',
      guid: 'https://csg-penny-dev.aviture-sandbox.com',
      post_type: 'versionInfo',
      post_uri: '/',
      post_categories: [],
      custom_fields: false
    }];

    test('It should set the versionInfo object to the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: VersionTypes.RetrieveVersionInformation.SUCCESS,
        payload
      });
      expect(response.versionInfo).toEqual(payload[0]);
      expect(response.isLoading).toBe(false);
    });

    test('It should set the versionInfo to an empty object when an empty payload is received', () => {
      const response = reducer(INITIAL_STATE, {
        type: VersionTypes.RetrieveVersionInformation.SUCCESS,
        payload: emptyPayload
      });
      expect(response.versionInfo).toEqual({});
      expect(response.isLoading).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the VersionTypes.RetrieveVersionInformation.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: VersionTypes.RetrieveVersionInformation.BEGIN
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
});
