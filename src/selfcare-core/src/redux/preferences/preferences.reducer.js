import Immutable from 'seamless-immutable';
import * as LocalStorageHelper from '../../helpers/storage/local.storage';
import { ConfigurationActionTypes } from '../configuration/configuration.actions';
import { DISPLAY_LANGUAGE } from '../utils/api.constants';
import { PreferencesTypes } from './preferences.actions';

export const INITIAL_STATE = new Immutable({
  selectedDisplayLanguage: LocalStorageHelper.read(DISPLAY_LANGUAGE)
});

export default function PreferencesReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ConfigurationActionTypes.RetrieveConfiguration.SUCCESS: {
    let result = state;

    if (!state.selectedDisplayLanguage) {
      result = result.set('selectedDisplayLanguage', payload.defaultLocale);
    }

    return result;
  }
  case PreferencesTypes.UpdateDisplayLanguage:
    return state.set('selectedDisplayLanguage', payload);
  default:
    return state;
  }
}
