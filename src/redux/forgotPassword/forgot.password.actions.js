export const ForgotPasswordActionTypes = {
  UPDATE_USER_ID: 'UPDATE_USER_ID'
};

export const UpdateUserId = (userId) => {
  return {
    type: ForgotPasswordActionTypes.UPDATE_USER_ID,
    payload: userId
  };
};
