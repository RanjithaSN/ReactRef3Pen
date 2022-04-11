import Immutable from 'seamless-immutable';
import * as ResetPassword from './reset.password.selectors';
import { INITIAL_STATE } from './reset.password.reducer';

const initializedStore = new Immutable({
  client: {
    resetPassword: INITIAL_STATE
  }
});

describe('ResetPassword ', () => {
  describe('When the ResetPasswordIsUpdating is used...', () => {
    test('It should return the value of the isUpdating attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'resetPassword', 'isUpdating'], true);
      expect(ResetPassword.ResetPasswordIsUpdating(CUSTOM_STATE)).toEqual(true);
    });

    test('It should return false when there is no store passed in.', () => {
      expect(ResetPassword.ResetPasswordIsUpdating()).toEqual(false);
    });
  });

  describe('When the FromResetPasswordPage is used...', () => {
    test('It should return the value of the fromResetPasswordPage attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'resetPassword', 'fromResetPasswordPage'], true);
      expect(ResetPassword.FromResetPasswordPage(CUSTOM_STATE)).toEqual(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(ResetPassword.FromResetPasswordPage()).toEqual(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(ResetPassword.FromResetPasswordPage.resultFunc({})).toBe(false);
    });
  });
});
