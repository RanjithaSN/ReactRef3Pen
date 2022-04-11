import { UserInfoActionTypes } from './user.info.actions';
import reducer, { INITIAL_STATE } from './user.info.reducer';

describe('UserInfoReducerTests', () => {
  describe('UPDATE_USER_INFO_FORM_VALUES', () => {
    const BOB_PAYLOAD = {
      FirstName: 'Bob'
    };

    const DOLE_PAYLOAD = {
      LastName: 'Dole'
    };

    test('It should set formValues to payload object given', () => {
      const result = reducer(INITIAL_STATE, {
        type: UserInfoActionTypes.UPDATE_USER_INFO_FORM_VALUES,
        payload: BOB_PAYLOAD
      });
      expect(result.formValues).toEqual(BOB_PAYLOAD);
    });

    test('It should merge existing formValues to payload object given', () => {
      const result = reducer(INITIAL_STATE.set('formValues', BOB_PAYLOAD), {
        type: UserInfoActionTypes.UPDATE_USER_INFO_FORM_VALUES,
        payload: DOLE_PAYLOAD
      });
      expect(result.formValues).toEqual({
        ...BOB_PAYLOAD,
        ...DOLE_PAYLOAD
      });
    });
  });

  describe('RESET_USER_INFO_FORM', () => {
    test('It should set formValues to null', () => {
      const result = reducer(INITIAL_STATE.set('formValues', 'NOT NULL'), {
        type: UserInfoActionTypes.RESET_USER_INFO_FORM
      });
      expect(result.formValues).toEqual(null);
    });
  });
});
