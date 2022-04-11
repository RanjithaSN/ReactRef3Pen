import { SHOULD_SHOW_COOKIE_INFO } from 'selfcare-core/src/redux/utils/api.constants';
import * as LocalStorageHelper from 'selfcare-core/src/helpers/storage/local.storage';

export const SiteTypes = {
  UpdateCurrentAccount: 'UPDATE_CURRENT_ACCOUNT',
  UpdateCurrentPage: 'UPDATE_CURRENT_PAGE',
  UpdateLocaleReady: 'UPDATE_LOCALE_READY',
  UpdateShouldShowCookieInfo: 'UPDATE_SHOULD_SHOW_COOKIE_INFO',
  UpdateShouldShowOTTGuidedExperience: 'UPDATE_SHOULD_SHOW_OTT_GUIDED_EXPERIENCE',
  UpdateShouldShowGetHelpOverlay: 'UPDATE_SHOULD_SHOW_GET_HELP_OVERLAY',
  SetScroll: 'SET_SCROLL'
};

export const LocaleReady = (isReady) => {
  return {
    type: SiteTypes.UpdateLocaleReady,
    payload: isReady
  };
};

export const UpdateShouldShowCookieInfo = (shouldShowCookieInfo) => {
  return {
    type: SiteTypes.UpdateShouldShowCookieInfo,
    payload: shouldShowCookieInfo
  };
};

export const UpdateShouldShowOTTGuidedExperience = (shouldShowOTTGuidedExperience) => {
  return {
    type: SiteTypes.UpdateShouldShowOTTGuidedExperience,
    payload: shouldShowOTTGuidedExperience
  };
};

export const UpdateShouldShowGetHelpOverlay = (shouldShowGetHelpOverlay) => {
  return {
    type: SiteTypes.UpdateShouldShowGetHelpOverlay,
    payload: shouldShowGetHelpOverlay
  };
};

/* Reads cookie information from local storage and updates the store.
 * Is run once after hydrating on client side */
export const UpdateCookieInfoFromLocalStorage = () => {
  return (dispatch) => {
    dispatch(UpdateShouldShowCookieInfo(LocalStorageHelper.read(SHOULD_SHOW_COOKIE_INFO)));
  };
};

export const SetScroll = (scrollInfo = null) => {
  return {
    type: SiteTypes.SetScroll,
    payload: scrollInfo
  };
};
