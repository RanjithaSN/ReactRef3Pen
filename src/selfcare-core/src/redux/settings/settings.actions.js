import AppConfig from 'AppConfig';
import * as LocalStorageHelper from '../../helpers/storage/local.storage';
import { ENVIRONMENT_HEADER, SYSTEM_ID_HEADER } from '../utils/api.constants';

export const SettingsActionTypes = {
  PERSIST_ENVIRONMENT: 'PERSIST_ENVIRONMENT',
  SAVE_SELECTED_ENVIRONMENT: 'SAVE_SELECTED_ENVIRONMENT',
  SAVE_SELECTED_SYSTEM_ID: 'SAVE_SELECTED_SYSTEM_ID',
  UPDATE_RIGHT_TO_RETURN_DAYS: 'UPDATE_RIGHT_TO_RETURN_DAYS',
  UPDATE_PORT_IN_FDA_DAYS: 'UPDATE_PORT_IN_FDA_DAYS',
  UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID: 'UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID',
  UPDATE_SHOW_DEVICE_OFFERS: 'UPDATE_SHOW_DEVICE_OFFERS'
};

export const UpdateSelectedDistributionChannel = (distributionChannelId) => {
  return {
    type: SettingsActionTypes.UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID,
    payload: distributionChannelId
  };
};

export const UpdateIsBenifyDistributionChannel = (isBenify) => (dispatch) => {
  const distributionChannel = isBenify ? AppConfig.BENIFY_DISTRIBUTION_CHANNEL_ID : AppConfig.DISTRIBUTION_CHANNEL_ID;

  dispatch(UpdateSelectedDistributionChannel(distributionChannel));
};

export const SaveEnvironmentSelections = (environment, systemId) => (dispatch) => {
  dispatch({
    type: SettingsActionTypes.SAVE_SELECTED_ENVIRONMENT,
    payload: environment
  });

  dispatch({
    type: SettingsActionTypes.SAVE_SELECTED_SYSTEM_ID,
    payload: systemId
  });
};

export const ForceEnvironmentUpdate = () => (dispatch) => {
  dispatch(SaveEnvironmentSelections(LocalStorageHelper.read(ENVIRONMENT_HEADER), LocalStorageHelper.read(SYSTEM_ID_HEADER)));
};
