import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { PasswordManagementTypes } from '@selfcare/core/redux/passwordManagement/password.management.actions';
import Immutable from 'seamless-immutable';


export const INITIAL_STATE = new Immutable({
  fromResetPasswordPage: false,
  isUpdating: false
});

export default function ResetPasswordReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case PasswordManagementTypes.RESET_PASSWORD.BEGIN:
  case PasswordManagementTypes.UPDATE_CREDENTIALS.BEGIN:
    return state.set('isUpdating', true);
  case PasswordManagementTypes.RESET_PASSWORD.SUCCESS:
  case PasswordManagementTypes.UPDATE_CREDENTIALS.SUCCESS:
    return state.set('isUpdating', false)
      .set('fromResetPasswordPage', true);
  case PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD.SUCCESS:
    return state.set('fromResetPasswordPage', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case PasswordManagementTypes.RESET_PASSWORD.BEGIN:
    case PasswordManagementTypes.UPDATE_CREDENTIALS.BEGIN:
      return state.set('isUpdating', false)
        .set('fromResetPasswordPage', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
