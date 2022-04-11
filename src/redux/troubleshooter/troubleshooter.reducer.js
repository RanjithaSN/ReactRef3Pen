import * as SessionStorageHelper from '@selfcare/core/helpers/storage/session.storage';
import { TROUBLE_SHOOTER_HISTORY } from '@selfcare/core/redux/utils/api.constants';
import Immutable from 'seamless-immutable';
import { TroubleshooterTypes } from './troubleshooter.actions';

export const INITIAL_STATE = new Immutable({
  History: SessionStorageHelper.read(TROUBLE_SHOOTER_HISTORY) || []
});

export default function TroubleshooterReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
  case TroubleshooterTypes.PushToHistory:
    return state.set('History', payload);
  default:
    return state;
  }
}
