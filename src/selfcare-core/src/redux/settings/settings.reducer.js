import Immutable from 'seamless-immutable';
import * as LocalStorageHelper from '../../helpers/storage/local.storage';
import { ConfigurationActionTypes } from '../configuration/configuration.actions';
import { OFFER_TYPES } from '../searchOffers/search.offers.constants';
import { DISTRIBUTION_CHANNEL_ID, ENVIRONMENT_HEADER, PORT_IN_FDA_HEADER, RIGHT_TO_RETURN_HEADER, SHOW_DEVICE_OFFERS, SYSTEM_ID_HEADER } from '../utils/api.constants';
import { SettingsActionTypes } from './settings.actions';

export const INITIAL_STATE = new Immutable({
  rightToReturnDays: LocalStorageHelper.read(RIGHT_TO_RETURN_HEADER),
  portInFDADays: LocalStorageHelper.read(PORT_IN_FDA_HEADER),
  selectedDistributionChannel: DISTRIBUTION_CHANNEL_ID,
  selectedEnvironment: LocalStorageHelper.read(ENVIRONMENT_HEADER),
  selectedSystemId: LocalStorageHelper.read(SYSTEM_ID_HEADER),
  showDeviceOffers: LocalStorageHelper.read(SHOW_DEVICE_OFFERS),
  selectedOfferType: LocalStorageHelper.read(SHOW_DEVICE_OFFERS) ? OFFER_TYPES.DEVICE : OFFER_TYPES.STANDARD

});

export default function(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case ConfigurationActionTypes.RetrieveConfiguration.SUCCESS: {
    let result = state;

    if (!state.selectedEnvironment) {
      result = result.set('selectedEnvironment', payload.defaultEnvironment);
    }

    if (!state.selectedSystemId) {
      result = result.set('selectedSystemId', payload.defaultSystemId);
    }

    return result;
  }
  case SettingsActionTypes.SAVE_SELECTED_ENVIRONMENT:
    return state.set('selectedEnvironment', payload);
  case SettingsActionTypes.SAVE_SELECTED_SYSTEM_ID:
    return state.set('selectedSystemId', payload);
  case SettingsActionTypes.UPDATE_SHOW_DEVICE_OFFERS:
    return state.set('showDeviceOffers', payload);
  case SettingsActionTypes.UPDATE_RIGHT_TO_RETURN_DAYS:
    return state.set('rightToReturnDays', payload);
  case SettingsActionTypes.UPDATE_PORT_IN_FDA_DAYS:
    return state.set('portInFDADays', payload);
  case SettingsActionTypes.UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID:
    return state.set('selectedDistributionChannel', payload);
  default:
    return state;
  }
}
