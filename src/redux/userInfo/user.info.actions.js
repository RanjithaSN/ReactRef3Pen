export const UserInfoActionTypes = {
  UPDATE_USER_INFO_FORM_VALUES: 'UPDATE_USER_INFO_FORM_VALUES',
  RESET_USER_INFO_FORM: 'RESET_USER_INFO_FORM'
};

export const ResetUserInfoForm = () => ({
  type: UserInfoActionTypes.RESET_USER_INFO_FORM
});


export const UpdateUserInfoFormValues = (values) => ({
  type: UserInfoActionTypes.UPDATE_USER_INFO_FORM_VALUES,
  payload: values
});
