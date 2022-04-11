import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './preferences.reducer';
import * as Preferences from './preferences.selectors';

const initializedStore = new Immutable({
  ascendon: {
    preferences: INITIAL_STATE
  }
});

describe('Preferences ', () => {
  describe('When the SelectedLocale is used...', () => {
    test('It should return the value of the selectedDisplayLanguage attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore
        .setIn(['ascendon', 'preferences', 'selectedDisplayLanguage'], 'en-US');
      expect(Preferences.SelectedLocale(CUSTOM_STATE)).toBe('en-US');
    });
    test('It should return the value of the configuration locale in the event of there not being a selected locale', () => {
      const CUSTOM_STATE = initializedStore
        .setIn(['ascendon', 'configuration', 'data', 'defaultLocale'], 'en-US')
        .setIn(['ascendon', 'preferences', 'selectedDisplayLanguage'], null);
      expect(Preferences.SelectedLocale(CUSTOM_STATE)).toBe('en-US');
    });
  });
});
