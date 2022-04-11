export const LoginTypes = {
  UpdateShouldShowSessionExpiration: 'UPDATE_SHOULD_SHOW_SESSION_EXPIRATION',
  OpenLoginModal: 'OPEN_LOGIN_MODAL',
  CloseLoginModal: 'CLOSE_LOGIN_MODAL'
};

export const UpdateShouldShowSessionExpiration = (value) => {
  return {
    type: LoginTypes.UpdateShouldShowSessionExpiration,
    payload: value
  };
};

export const OpenLoginModal = () => {
  return {
    type: LoginTypes.OpenLoginModal
  };
};

export const CloseLoginModal = () => {
  return {
    type: LoginTypes.CloseLoginModal
  };
};
