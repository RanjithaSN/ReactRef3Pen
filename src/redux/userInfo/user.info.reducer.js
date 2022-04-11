import Immutable from 'seamless-immutable';
import { UserInfoActionTypes } from './user.info.actions';

export const INITIAL_STATE = new Immutable({
  formValues: null
});

export default function UserInfoReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case UserInfoActionTypes.UPDATE_USER_INFO_FORM_VALUES:
    return state.set('formValues', {
      ...state.formValues,
      ...payload
    });
  case UserInfoActionTypes.RESET_USER_INFO_FORM:
    return state.set('formValues', null);
  default:
    return state;
  }
}
