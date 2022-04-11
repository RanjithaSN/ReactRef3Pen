import { LandingPageTypes } from './landing.page.actions';
import reducer, { INITIAL_STATE } from './landing.page.reducer';

describe('Landing Page Reducer', () => {
  describe('When LandingPageTypes.FetchLandingPage.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: LandingPageTypes.FetchLandingPage.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });

  describe('When LandingPageTypes.FetchLandingPage.SUCCESS is dispatched...', () => {
    const payload = [
      {
        ID: 2,
        post_title: 'The student landing page',
        guid: 'https://csg-penny-dev.aviture-sandbox.com/?post_type=faqs&#038;p=50',
        post_type: 'landing_page',
        post_uri: '/student-landing-page',
        custom_fields: false

      },
      {
        ID: 1,
        post_title: 'The normal landingpage',
        guid: 'https://csg-penny-dev.aviture-sandbox.com/?post_type=faqs&#038;p=50',
        post_type: 'landing_page',
        post_uri: '/landing-page',
        custom_fields: false
      }
    ];

    test('It should set the landing object to the item with post_uri /landing-page in the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: LandingPageTypes.FetchLandingPage.SUCCESS,
        payload
      });
      expect(response.landingPage).toEqual(payload[1]);
    });

    test('It should set the student landing object to the item with post_uri /student-landing-page in the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: LandingPageTypes.FetchLandingPage.SUCCESS,
        payload
      });
      expect(response.studentLandingPage).toEqual(payload[0]);
    });

    test('It should throw if no landing page exists in the payload.', () => {
      const reducerCall = () => reducer(INITIAL_STATE, {
        type: LandingPageTypes.FetchLandingPage.SUCCESS,
        payload: [payload[0]]
      });
      expect(reducerCall).toThrow();
    });

    test('It should throw if no student landing page exists in the payload.', () => {
      const reducerCall = () => reducer(INITIAL_STATE, {
        type: LandingPageTypes.FetchLandingPage.SUCCESS,
        payload: [payload[1]]
      });
      expect(reducerCall).toThrow();
    });
  });
});
