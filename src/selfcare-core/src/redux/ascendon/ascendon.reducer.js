import { combineReducers } from 'redux';
import benefitsConfiguration from '../benefits/benefits.reducer';
import configuration from '../configuration/configuration.reducer';
import metadata from '../metadata/metadata.reducer';
import preferences from '../preferences/preferences.reducer';
import settings from '../settings/settings.reducer';
import subscriberApi from './subscriber.api.reducer';

export default combineReducers({
  benefitsConfiguration,
  configuration,
  metadata,
  preferences,
  settings,
  subscriberApi
});
