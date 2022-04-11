import apiFaultCodes from '../../constants/api.fault.codes';
import { FaultTypes } from '../fault/fault.actions';
import { PasswordManagementTypes } from '../passwordManagement/password.management.actions';
import { SessionActionTypes } from './session.actions';
import reducer, { INITIAL_STATE } from './session.reducer';

describe('Session Reducer', () => {
  [
    SessionActionTypes.CREATE_SUBSCRIBER_SESSION.BEGIN
  ].forEach((type) => {
    describe(`When ${type} is dispatched...`, () => {
      let response;

      beforeEach(() => {
        response = reducer(INITIAL_STATE, {
          type
        });
      });

      test('It should set the isCreating flag to true.', () => {
        expect(response.isCreating).toBe(true);
      });

      test('It should set the data attribute to null.', () => {
        expect(response.data).toBeNull();
      });
    });
  });

  [
    SessionActionTypes.CREATE_PROSPECT_SESSION,
    SessionActionTypes.CREATE_SUBSCRIBER_SESSION.SUCCESS,
    PasswordManagementTypes.RESET_PASSWORD.SUCCESS
  ].forEach((type) => {
    describe(`When ${type} is dispatched...`, () => {
      const payload = {
        SessionId: 1,
        SessionSummary: {
          PasswordTemporary: true
        }
      };
      let response;

      beforeEach(() => {
        response = reducer(INITIAL_STATE, {
          type,
          payload
        });
      });

      test('It should set the data attribute to the session id from the response in the payload.', () => {
        expect(response.data).toEqual(payload.SessionId);
      });

      test('It should set the sessionExpired flag to false.', () => {
        expect(response.sessionExpired).toBe(false);
      });

      test('It should set the isCreating flag to false.', () => {
        expect(response.isCreating).toBe(false);
      });

      test('It should set the isPasswordTemporary flag to true when the PasswordTemporary is true.', () => {
        expect(response.isPasswordTemporary).toEqual(payload.SessionSummary.PasswordTemporary);
      });

      describe('and the payload has an undefined PasswordTemporary property.', () => {
        test('It should set the isPasswordTemporary flag to false when the PasswordTemporary is undefined.', () => {
          const nonTemporaryPasswordResponse = reducer(INITIAL_STATE, {
            type: SessionActionTypes.CREATE_SUBSCRIBER_SESSION.SUCCESS,
            payload: {
              SessionId: 1,
              SessionSummary: {
                PasswordTemporary: undefined
              }
            }
          });
          expect(nonTemporaryPasswordResponse.isPasswordTemporary).toEqual(false);
        });
      });
    });
  });

  describe('When SessionActionTypes.REFRESH_SESSION.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SessionActionTypes.REFRESH_SESSION.BEGIN
      });
    });

    test('It should set the data attribute to null.', () => {
      expect(response.data).toBeNull();
    });

    test('It should set the isRefreshing attribute to true.', () => {
      expect(response.isRefreshing).toBe(true);
    });
  });

  describe('When SessionActioNTypes.REFRESH_SESSION.SUCCESS is dispatched...', () => {
    const payload = {
      SessionId: 1
    };
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SessionActionTypes.REFRESH_SESSION.SUCCESS,
        payload
      });
    });

    test('It should set the data attribute to the session id from the payload.', () => {
      expect(response.data).toEqual(payload.SessionId);
    });

    test('It should set the isCreating flag to false.', () => {
      expect(response.isRefreshing).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isCreating attribute to false when the trigger is the CREATE_SUBSCRIBER_SESSION.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isCreating', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SessionActionTypes.CREATE_SUBSCRIBER_SESSION.BEGIN
        }
      });

      expect(response.isCreating).toBe(false);
    });

    test('It should set the isCreating attribute to false when the trigger is the CreateSubscriber.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isCreating', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SessionActionTypes.CREATE_SUBSCRIBER_SESSION.BEGIN
        }
      });

      expect(response.isCreating).toBe(false);
    });

    test('It should set the sessionExpired flag to true when there is a apiFaultCodes.SESSION_EXPIRED fault code', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('sessionExpired', false);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          Code: apiFaultCodes.SESSION_EXPIRED
        }
      });

      expect(response.sessionExpired).toBe(true);
    });

    test('It should set the isCreating attribute to false when the trigger is the REFRESH_SESSION.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isRefreshing', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SessionActionTypes.REFRESH_SESSION.BEGIN
        }
      });

      expect(response.isRefreshing).toBe(false);
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
