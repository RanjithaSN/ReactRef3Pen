import { BUILD_ENVIRONMENTS } from '@selfcare/core/constants/environment.configuration';
import { OFFER_TYPES } from '@selfcare/core/redux/searchOffers/search.offers.constants';
import AppConfig from 'AppConfig';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Ascendon } from '../ascendon/ascendon.selectors';
import { BusinessUnits } from '../configuration/configuration.selectors';

export const Base = createSelector([
  Ascendon
], (ascendon) => {
  return pathOr(null, ['settings'], ascendon);
});

export const SelectedEnvironment = () => AppConfig.ENVIRONMENT_NAME;
export const RightToReturnDays = () => AppConfig.RIGHT_TO_RETURN_DAYS;

export const ShowingDeviceOffers = createSelector([
  Base
], (data) => {
  return pathOr(false, ['showDeviceOffers'], data);
});

export const SelectedOfferType = createSelector([
  Base
], (data) => {
  return pathOr(OFFER_TYPES.STANDARD, ['selectedOfferType'], data);
});

export const CloudSearchUrl = () => AppConfig.CLOUD_SEARCH_ORIGIN_KEY;
export const CdnApiUrl = AppConfig.CDN_API_URL;
export const MetadataApiUrl = () => AppConfig.METADATA_URL;
export const MecenatApiUrl = () => AppConfig.MECENAT_URL;
export const ServiceApiUrl = () => AppConfig.SERVICE_URL;
export const StubApiUrl = () => AppConfig.STUB_URL;
export const Tele2ApiUrl = () => AppConfig.TELE2_URL;
export const Tele2AuthApiUrl = () => AppConfig.TELE2_AUTH_URL;
export const InAccountHelpUrl = () => `${AppConfig.TELE2_URL}/articleSearch`;
export const SelectedSystemId = () => AppConfig.SYSTEM_ID;
export const TempSystemId = () => AppConfig.SYSTEM_ID;
export const DistributionChannel = () => AppConfig.DISTRIBUTION_CHANNEL_ID;
export const BenifyDistributionChannel = () => AppConfig.BENIFY_DISTRIBUTION_CHANNEL_ID;
export const enableDiscounts = () => JSON.parse(AppConfig.ENABLE_DISCOUNTS);

export const SelectedDistributionChannel = createSelector([
  Base
], (data: any) => {
  return pathOr(DistributionChannel, ['selectedDistributionChannel'], data);
});

export const SelectedBusinessUnit = createSelector([
  SelectedSystemId,
  BusinessUnits
], (selectedSystemId, businessUnits) => {
  if (AppConfig.ENVIRONMENT_NAME === BUILD_ENVIRONMENTS.PRD || AppConfig.ENVIRONMENT_NAME === BUILD_ENVIRONMENTS.STG) {
    return AppConfig.BUSINESS_UNIT;
  }

  if (selectedSystemId === null) {
    return null;
  }

  const selectedBusinessUnit = businessUnits.find((businessUnit) => {
    return businessUnit.id === selectedSystemId;
  });
  return selectedBusinessUnit || null;
});

export const InaccountHelpApiUrl = createSelector([InAccountHelpUrl], (url: string) => url);
