import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { VideosTypes } from './videos.actions';
import reducer, { INITIAL_STATE } from './videos.reducer';

describe('Videos Reducer', () => {
  describe('When VideosTypes.RetrieveVideos.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: VideosTypes.RetrieveVideos.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });
  describe('When VideosTypes.RetrieveVideos.SUCCESS is dispatched...', () => {
    const emptyPayload = null;
    const payload = [{
      ID: 50,
      post_title: 'How do I do something?',
      post_type: 'video',
      post_uri: '/',
      post_categories: [],
      custom_fields: false
    }];

    test('It should set the data object to the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: VideosTypes.RetrieveVideos.SUCCESS,
        payload
      });
      expect(response.data).toEqual(payload);
      expect(response.isLoading).toBe(false);
    });

    test('It should set the videos to an empty object when an empty payload is received', () => {
      const response = reducer(INITIAL_STATE, {
        type: VideosTypes.RetrieveVideos.SUCCESS,
        emptyPayload
      });
      expect(response.data).toEqual([]);
      expect(response.isLoading).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the VideosTypes.RetrieveVideos.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: VideosTypes.RetrieveVideos.BEGIN
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
