import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import apiFaultCodes from '../../constants/api.fault.codes';
import * as LocalStorageHelper from '../../helpers/storage/local.storage';
import { FaultTypes } from '../fault/fault.actions';
import { PasswordManagementTypes } from '../passwordManagement/password.management.actions';
import { SESSION_ID_HEADER, SUBSCRIBER_CURRENT_COUNTRY } from '../utils/api.constants';
import { SessionActionTypes } from './session.actions';

export const INITIAL_STATE = new Immutable({
  currentCountry: LocalStorageHelper.read(SUBSCRIBER_CURRENT_COUNTRY),
  data: LocalStorageHelper.read(SESSION_ID_HEADER),
  isCreating: false,
  isRefreshing: false,
  isPasswordTemporary: false,
  sessionExpired: false
});

export default function(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SessionActionTypes.CREATE_SUBSCRIBER_SESSION.BEGIN:
    return state
      .set('data', null)
      .set('currentCountry', null)
      .set('isCreating', true);
  case SessionActionTypes.CREATE_PROSPECT_SESSION:
  case SessionActionTypes.CREATE_SUBSCRIBER_SESSION.SUCCESS:
  case PasswordManagementTypes.RESET_PASSWORD.SUCCESS:
    return state
      .set('data', payload.SessionId)
      .set('currentCountry', payload.Country)
      .set('sessionExpired', false)
      .set('isCreating', false)
      .set('isPasswordTemporary', (pathOr(false, ['SessionSummary', 'PasswordTemporary'], payload)));
  case SessionActionTypes.REFRESH_SESSION.BEGIN:
    return state
      .set('data', null)
      .set('isRefreshing', true);
  case SessionActionTypes.REFRESH_SESSION.SUCCESS:
    return state
      .set('data', payload.SessionId)
      .set('isRefreshing', false);
  case FaultTypes.API_FAULT:
    if (payload.Code === apiFaultCodes.SESSION_EXPIRED) {
      return state.set('sessionExpired', true);
    }
    switch (payload.trigger) {
    case SessionActionTypes.CREATE_SUBSCRIBER_SESSION.BEGIN:
      return state.set('isCreating', false);
    case SessionActionTypes.REFRESH_SESSION.BEGIN:
      return state.set('isRefreshing', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
