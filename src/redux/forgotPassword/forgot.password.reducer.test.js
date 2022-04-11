import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { PasswordManagementTypes } from '@selfcare/core/redux/passwordManagement/password.management.actions';
import { SessionActionTypes } from '@selfcare/core/redux/session/session.actions';
import { ForgotPasswordActionTypes } from './forgot.password.actions';
import reducer, { INITIAL_STATE } from './forgot.password.reducer';

describe('Forgot Password Reducer', () => {
  describe('When ForgotPasswordActionTypes.RETRIEVE_FORGOT_PASSWORD.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });

  describe('When ForgotPasswordActionTypes.RETRIEVE_FORGOT_PASSWORD.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      id: 1
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE.set('isLoading', true).set('fromForgotPasswordPage', false), {
        type: PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.SUCCESS,
        payload
      });
    });
    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });
    test('It should set the fromForgotPasswordPage flag to true.', () => {
      expect(response.fromForgotPasswordPage).toBe(true);
    });
  });

  describe('When SessionActionTypes.CREATE_SUBSCRIBER_SESSION.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      id: 1
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE.set('fromForgotPasswordPage', true), {
        type: SessionActionTypes.CREATE_SUBSCRIBER_SESSION.SUCCESS,
        payload
      });
    });
    test('It should set the fromForgotPasswordPage flag to false.', () => {
      expect(response.fromForgotPasswordPage).toBe(false);
    });
  });

  describe('When ForgotPasswordActionTypes.UPDATE_USER_ID is dispatched...', () => {
    let response;
    const payload = 'wade';

    beforeEach(() => {
      response = reducer(INITIAL_STATE.set('userId', null), {
        type: ForgotPasswordActionTypes.UPDATE_USER_ID,
        payload
      });
    });
    test('It should set the isLoading flag to false.', () => {
      expect(response.userId).toEqual(payload);
    });
  });

  describe('When API Fault is dispatched with begin trigger...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE.set('isLoading', true).set('fromForgotPasswordPage', true), {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.BEGIN
        }
      });
    });

    test('It should clear isLoading.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should set the from forgot password page to false', () => {
      expect(response.fromForgotPasswordPage).toBe(false);
    });
  });

  describe('When API Fault is dispatch with other trigger...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: 'other trigger'
        }
      });

      expect(response).toBe(INITIAL_STATE);
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
