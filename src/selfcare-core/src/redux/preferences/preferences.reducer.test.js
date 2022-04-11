import { PreferencesTypes } from './preferences.actions';
import reducer, { INITIAL_STATE } from './preferences.reducer';

describe('Preferences Reducer', () => {
  describe('When PreferencesTypes.UpdateDisplayLanguage is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: PreferencesTypes.UpdateDisplayLanguage,
        payload: 'en-US'
      });
    });

    test('It should set the selectedDisplayLanguage flag to the locale passed in the payload.', () => {
      expect(response.selectedDisplayLanguage).toBe('en-US');
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
