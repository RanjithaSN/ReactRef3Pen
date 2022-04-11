import Immutable from 'seamless-immutable';
import * as ForgotPassword from './forgot.password.selectors';
import { INITIAL_STATE } from './forgot.password.reducer';

const initializedStore = new Immutable({
  client: {
    forgotPassword: INITIAL_STATE
  }
});

describe('ForgotPassword ', () => {
  describe('When the IsSendingEmail is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'forgotPassword', 'isLoading'], true);
      expect(ForgotPassword.IsSendingEmail(CUSTOM_STATE)).toEqual(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(ForgotPassword.IsSendingEmail()).toEqual(false);
    });
  });
  describe('When the FromForgotPasswordPage is used...', () => {
    test('It should return the value of the fromForgotPasswordPage attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'forgotPassword', 'fromForgotPasswordPage'], true);
      expect(ForgotPassword.FromForgotPasswordPage(CUSTOM_STATE)).toEqual(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(ForgotPassword.FromForgotPasswordPage()).toEqual(false);
    });
  });
  describe('When the UserId is used...', () => {
    test('It should update the value of userId attribute when one exists.', () => {
      const DATA = {
        userId: 'wade'
      };
      const CUSTOM_STATE = initializedStore.setIn(['client', 'forgotPassword', 'userId'], DATA);
      expect(ForgotPassword.UserId(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when no store is passed in.', () => {
      expect(ForgotPassword.UserId()).toBeNull();
    });
  });
});
