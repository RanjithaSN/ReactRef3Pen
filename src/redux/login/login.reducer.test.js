import { LoginTypes } from './login.actions';
import reducer, { INITIAL_STATE } from './login.reducer';

describe('Login Reducer', () => {
  describe('When LoginTypes.UpdateShouldShowSessionExpiration is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: LoginTypes.UpdateShouldShowSessionExpiration,
        payload: true
      });
    });

    test('It should set the isUpdating flag to true.', () => {
      expect(response.shouldShowSessionExpiration).toBe(true);
    });
  });

  describe('When LoginTypes.OpenLoginModal is dispatched...', () => {
    test('isLoginModal open should be true', () => {
      const response = reducer(INITIAL_STATE, {
        type: LoginTypes.OpenLoginModal,
        payload: true
      });

      expect(response.isLoginModalOpen).toBe(true);
    });
  });

  describe('When LoginTypes.CLOSE_LOGIN_MODAL is dispatched...', () => {
    test('isLoginModal open should be false', () => {
      const response = reducer(INITIAL_STATE, {
        type: LoginTypes.CloseLoginModal,
        payload: false
      });

      expect(response.isLoginModalOpen).toBe(false);
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
