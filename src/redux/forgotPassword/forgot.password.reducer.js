import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { PasswordManagementTypes } from '@selfcare/core/redux/passwordManagement/password.management.actions';
import { SessionActionTypes } from '@selfcare/core/redux/session/session.actions';
import Immutable from 'seamless-immutable';
import { ForgotPasswordActionTypes } from './forgot.password.actions';

export const INITIAL_STATE = new Immutable({
  fromForgotPasswordPage: false,
  isLoading: false,
  userId: null

});

export default function ForgotPasswordReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.BEGIN:
    return state.set('isLoading', true);
  case PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.SUCCESS:
    return state.set('isLoading', false)
      .set('fromForgotPasswordPage', true);
  case SessionActionTypes.CREATE_SUBSCRIBER_SESSION.SUCCESS:
    return state.set('fromForgotPasswordPage', false);
  case ForgotPasswordActionTypes.UPDATE_USER_ID:
    return state.set('userId', payload);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.BEGIN:
      return state.set('isLoading', false)
        .set('fromForgotPasswordPage', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
