import Immutable from 'seamless-immutable';
import { LoginTypes } from './login.actions';

export const INITIAL_STATE = Immutable({
  shouldShowSessionExpiration: false,
  isLoginModalOpen: false
});

export default function LoginReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case LoginTypes.UpdateShouldShowSessionExpiration:
    return state.set('shouldShowSessionExpiration', payload);
  case LoginTypes.OpenLoginModal:
    return state.set('isLoginModalOpen', true);
  case LoginTypes.CloseLoginModal:
    return state.set('isLoginModalOpen', false);
  default:
    return state;
  }
}
