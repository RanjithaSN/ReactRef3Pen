import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { GuidesTypes } from './guides.actions';
import reducer, { INITIAL_STATE } from './guides.reducer';

describe('Guides Reducer', () => {
  describe('When GuidesTypes.RetrieveGuides.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: GuidesTypes.RetrieveGuides.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });

  describe('When GuidesTypes.RetrieveGuides.SUCCESS is dispatched...', () => {
    const emptyPayload = null;
    const payload = [{
      ID: 50,
      post_title: 'How do I do something?',
      post_type: 'guide',
      post_uri: '/',
      post_categories: [],
      custom_fields: false
    }];

    test('It should set the data object to the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: GuidesTypes.RetrieveGuides.SUCCESS,
        payload
      });
      expect(response.data).toEqual(payload);
      expect(response.isLoading).toBe(false);
    });

    test('It should set the guides to null when an empty payload is received', () => {
      const response = reducer(INITIAL_STATE, {
        type: GuidesTypes.RetrieveGuides.SUCCESS,
        payload: emptyPayload
      });
      expect(response.data).toEqual(null);
      expect(response.isLoading).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the GuidesTypes.RetrieveGuides.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: GuidesTypes.RetrieveGuides.BEGIN
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
