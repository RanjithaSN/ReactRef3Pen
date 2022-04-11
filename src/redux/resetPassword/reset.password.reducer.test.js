import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { PasswordManagementTypes } from '@selfcare/core/redux/passwordManagement/password.management.actions';
import reducer, { INITIAL_STATE } from './reset.password.reducer';

describe('ResetPassword Reducer', () => {
  [
    PasswordManagementTypes.UPDATE_CREDENTIALS.BEGIN,
    PasswordManagementTypes.RESET_PASSWORD.BEGIN
  ].forEach((type) => {
    describe(`When ${type} is dispatched...`, () => {
      let response;

      beforeEach(() => {
        response = reducer(INITIAL_STATE, {
          type
        });
      });

      test('It should set the isUpdating flag to true.', () => {
        expect(response.isUpdating).toBe(true);
      });
    });
  });

  [
    PasswordManagementTypes.UPDATE_CREDENTIALS.SUCCESS,
    PasswordManagementTypes.RESET_PASSWORD.SUCCESS
  ].forEach((type) => {
    describe(`When ${type} is dispatched...`, () => {
      let response;
      const payload = {
        id: 1
      };

      beforeEach(() => {
        response = reducer(INITIAL_STATE, {
          type,
          payload
        });
      });

      test('It should set the fromResetPasswordPage flag to true.', () => {
        expect(response.fromResetPasswordPage).toBe(true);
      });
    });
  });

  describe('When PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      id: 1
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.SUCCESS,
        payload
      });
    });

    test('It should set the isUpdating flag to false.', () => {
      expect(response.isUpdating).toBe(false);
    });
    test('It should set the fromResetPasswordPage flag to false.', () => {
      expect(response.fromResetPasswordPage).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    [
      PasswordManagementTypes.UPDATE_CREDENTIALS.BEGIN,
      PasswordManagementTypes.RESET_PASSWORD.BEGIN
    ].forEach((type) => {
      test(`It should set the isUpdating attribute to false when the trigger is the ${type} action.`, () => {
        const CUSTOM_STATE = INITIAL_STATE.set('isUpdating', true).set('fromResetPassword', true);
        const response = reducer(CUSTOM_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: PasswordManagementTypes.UPDATE_CREDENTIALS.BEGIN
          }
        });

        expect(response.isUpdating).toBe(false);
      });
    });

    [
      PasswordManagementTypes.UPDATE_CREDENTIALS.BEGIN,
      PasswordManagementTypes.RESET_PASSWORD.BEGIN
    ].forEach((type) => {
      test(`It should set the fromResetPassword attribute to false when the trigger is the ${type} action.`, () => {
        const CUSTOM_STATE = INITIAL_STATE.set('isUpdating', true).set('fromResetPassword', true);
        const response = reducer(CUSTOM_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: PasswordManagementTypes.UPDATE_CREDENTIALS.BEGIN
          }
        });

        expect(response.fromResetPasswordPage).toBe(false);
      });
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

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });
});
