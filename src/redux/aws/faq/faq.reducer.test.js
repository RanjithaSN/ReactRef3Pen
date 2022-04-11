import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { FaqTypes } from './faq.actions';
import reducer, { INITIAL_STATE } from './faq.reducer';

describe('Faq Reducer', () => {
  describe('When FaqTypes.FetchFaqs.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: FaqTypes.FetchFaqs.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });
  describe('When FaqTypes.FetchFaqs.SUCCESS is dispatched...', () => {
    const emptyPayload = null;
    const payload = [{
      ID: 50,
      post_title: 'How do I do something?',
      guid: 'https://csg-penny-dev.aviture-sandbox.com/?post_type=faqs&#038;p=50',
      post_type: 'faqs',
      post_uri: '/',
      post_categories: [],
      custom_fields: false
    }];

    test('It should set the faq object to the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FaqTypes.FetchFaqs.SUCCESS,
        payload
      });
      expect(response.data).toEqual(payload);
      expect(response.isLoading).toBe(false);
    });

    test('It should set the faq to an empty object when an empty payload is received', () => {
      const response = reducer(INITIAL_STATE, {
        type: FaqTypes.FetchFaqs.SUCCESS,
        emptyPayload
      });
      expect(response.data).toEqual([]);
      expect(response.isLoading).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the FaqTypes.FetchFaqs.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: FaqTypes.FetchFaqs.BEGIN
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
