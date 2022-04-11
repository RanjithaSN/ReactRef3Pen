
export const LoginInfoActionTypes = {
  UPDATE_LOGIN_INFO_FORM_VALUES: 'UPDATE_LOGIN_INFO_FORM_VALUES',
  RESET_LOGIN_INFO_FORM: 'RESET_LOGIN_INFO_FORM'
};

export const ResetLoginInfoForm = () => ({
  type: LoginInfoActionTypes.RESET_LOGIN_INFO_FORM
});

export const UpdateLoginInfoFormValues = (values) => ({
  type: LoginInfoActionTypes.UPDATE_LOGIN_INFO_FORM_VALUES,
  payload: values
});
