import { ISO_CODE_FOR_SWEDEN } from '@selfcare/core/constants/subscriber';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './session.reducer';
import * as Session from './session.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      session: INITIAL_STATE
    }
  }
});

describe('Session ', () => {
  describe('When the CurrentSession is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'session', 'data'], DATA);
      expect(Session.CurrentSession(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Session.CurrentSession()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(Session.CurrentSession.resultFunc({})).toBeNull();
    });
  });

  describe('When the IsCurrentSessionRefreshing is used...', () => {
    test('It should return the value of the isRefreshing attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'session', 'isRefreshing'], true);
      expect(Session.IsCurrentSessionRefreshing(CUSTOM_STATE)).toEqual(true);
    });

    test('It should return false there is no isRefreshing data.', () => {
      expect(Session.IsCurrentSessionRefreshing.resultFunc(null)).toBe(false);
    });
  });

  describe('When the CurrentLocation is used...', () => {
    test('It should return where the user is located if the data is provided.', () => {
      const currentCountry = 'USA';
      expect(Session.CurrentLocation.resultFunc({
        currentCountry
      })).toEqual(currentCountry);
    });

    test('It should return null there is no country data.', () => {
      expect(Session.CurrentLocation.resultFunc({})).toBe(null);
    });
  });

  describe('When the CurrentlyInSweden is used...', () => {
    test('It should return true if the user is in Sweden.', () => {
      const currentCountry = ISO_CODE_FOR_SWEDEN;
      expect(Session.CurrentlyInSweden.resultFunc({
        currentCountry
      })).toEqual(false);
    });
    test('It should return false if the user is not in Sweden.', () => {
      const currentCountry = 'USA';
      expect(Session.CurrentlyInSweden.resultFunc({
        currentCountry
      })).toEqual(false);
    });

    test('It should return false there is no country data.', () => {
      expect(Session.CurrentlyInSweden.resultFunc({})).toBe(false);
    });
  });

  describe('When the IsCurrentSessionCreating is used...', () => {
    test('It should return the value of the isCreating attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'session', 'isCreating'], true);
      expect(Session.IsCurrentSessionCreating(CUSTOM_STATE)).toEqual(true);
    });

    test('It should return false there is no isCreating data.', () => {
      expect(Session.IsCurrentSessionCreating.resultFunc(null)).toBe(false);
    });
  });

  describe('When the SessionIsExpired is used...', () => {
    test('It should return the value of the isPasswordTemporary attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'session', 'sessionExpired'], true);
      expect(Session.SessionIsExpired(CUSTOM_STATE)).toEqual(true);
    });
  });
});
