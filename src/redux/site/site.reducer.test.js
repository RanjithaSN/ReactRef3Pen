import { SiteTypes } from './site.actions';
import reducer, { INITIAL_STATE } from './site.reducer';

describe('Site Reducer', () => {
  describe('When SiteTypes.UpdateCurrentPage is dispatched...', () => {
    const payload = [{
      id: 1
    }];

    test('It should set the curentPage to the payload.', () => {
      const response = reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateCurrentPage,
        payload
      });
      expect(response.currentPage).toEqual(payload);
    });
  });

  describe('When SiteTypes.UpdateLocaleReady is dispatched...', () => {
    test('It should set the localeReady to the payload.', () => {
      expect(reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateLocaleReady,
        payload: true
      }).localeReady).toBe(true);
      expect(reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateLocaleReady,
        payload: false
      }).localeReady).toBe(false);
    });
  });

  describe('When SiteTypes.UpdateShouldShowCookieInfo is dispatched...', () => {
    test('It should set the shouldShowCookieInfo to the payload.', () => {
      expect(reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateShouldShowCookieInfo,
        payload: true
      }).shouldShowCookieInfo).toBe(true);
      expect(reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateShouldShowCookieInfo,
        payload: false
      }).shouldShowCookieInfo).toBe(false);
    });
  });

  describe('When SiteTypes.UpdateShouldShowOTTGuidedExperience is dispatched...', () => {
    test('It should set the shouldShowOTTGuidedExperience to the payload.', () => {
      expect(reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateShouldShowOTTGuidedExperience,
        payload: true
      }).shouldShowOTTGuidedExperience).toBe(true);
      expect(reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateShouldShowOTTGuidedExperience,
        payload: false
      }).shouldShowOTTGuidedExperience).toBe(false);
    });
  });

  describe('When SiteTypes.UpdateShouldShowGetHelpOverlay is dispatched...', () => {
    test('It should set the shouldShowGetHelpOverlay to the payload.', () => {
      expect(reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateShouldShowGetHelpOverlay,
        payload: true
      }).shouldShowGetHelpOverlay).toBe(true);
      expect(reducer(INITIAL_STATE, {
        type: SiteTypes.UpdateShouldShowGetHelpOverlay,
        payload: false
      }).shouldShowGetHelpOverlay).toBe(false);
    });
  });
});
