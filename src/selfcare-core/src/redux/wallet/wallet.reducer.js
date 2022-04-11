import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { WalletTypes } from './wallet.actions';

export const INITIAL_STATE = new Immutable({
  data: null,
  edit: null,
  isCreating: false,
  isDeleting: false,
  isLoading: false,
  isUpdating: false
});

export default function WalletReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case WalletTypes.RetrieveWallet.BEGIN:
    return state
      .set('data', null)
      .set('isLoading', true);
  case WalletTypes.RetrieveWallet.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case WalletTypes.RetrieveWallet.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
