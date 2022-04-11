import Immutable from 'seamless-immutable';
import { LoginInfoActionTypes } from './login.info.actions';

export const INITIAL_STATE = new Immutable({
  formValues: null
});

export default function LoginInfoReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case LoginInfoActionTypes.UPDATE_LOGIN_INFO_FORM_VALUES:
    return state.set('formValues', {
      ...state.formValues,
      ...payload
    });
  case LoginInfoActionTypes.RESET_LOGIN_INFO_FORM:
    return state.set('formValues', null);
  default:
    return state;
  }
}
