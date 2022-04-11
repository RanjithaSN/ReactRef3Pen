import { RetrieveSubscriber } from '../subscriber/subscriber.actions';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const PasswordManagementTypes = {
  RETRIEVE_FORGOT_PASSWORD: CreateAsyncFromString('RETRIEVE_FORGOT_PASSWORD'),
  RESET_PASSWORD: CreateAsyncFromString('RESET_PASSWORD'),
  UPDATE_CREDENTIALS: CreateAsyncFromString('UPDATE_CREDENTIALS')
};

export const GeneratePassword = (captchaResponse, userName) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), PasswordManagementTypes.RETRIEVE_FORGOT_PASSWORD, {
      method: 'post',
      removeCurrentSession: true,
      url: 'Subscriber/GeneratePassword'
    },
    {
      CaptchaResponse: captchaResponse,
      Login: userName
    });
  };
};

export const IssuePasswordReset = (token, password) => {
  return async (dispatch, getState) => {
    await apiThunkHelper(dispatch, getState(), PasswordManagementTypes.RESET_PASSWORD, {
      method: 'post',
      removeCurrentSession: true,
      url: 'Subscriber/ResetPassword'
    }, {
      AutoLogin: true,
      ResetToken: token,
      NewPassword: password
    });

    return dispatch(RetrieveSubscriber());
  };
};
