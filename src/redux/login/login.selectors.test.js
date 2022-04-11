import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './login.reducer';
import * as Login from './login.selectors';

const initializedStore = new Immutable({
  client: {
    login: INITIAL_STATE
  }
});

describe('Login ', () => {
  describe('When the ShouldShowSessionExpiration is used...', () => {
    test('It should return the value of the shouldShowSessionExpiration attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'login', 'shouldShowSessionExpiration'], true);
      expect(Login.ShouldShowSessionExpiration(CUSTOM_STATE)).toEqual(true);
    });

    test('It should return false when there is no store passed in.', () => {
      expect(Login.ShouldShowSessionExpiration()).toEqual(false);
    });
  });

  describe('When this IsLogingModalOpen selector is used...', () => {
    test('isLoginModalOpen should return false when the modal is closed', () => {
      expect(Login.IsLoginModalOpen()).toEqual(false);
    });

    test('isLoginModalOpen should return true when the modal is open', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'login', 'isLoginModalOpen'], true);
      expect(Login.IsLoginModalOpen(CUSTOM_STATE)).toEqual(true);
    });
  });
});
