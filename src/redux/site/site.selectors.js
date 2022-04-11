import { IsDbss } from '@selfcare/core/redux/configuration/configuration.selectors';
import { SelectedBusinessUnit } from '@selfcare/core/redux/settings/settings.selectors';
import isEmpty from 'ramda/src/isEmpty';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { buildFooterContent, buildHeaderContent, buildNavigator } from '../../navigation/navigation';
import { Client } from '../client.selectors';
import { NonProspectIsLoggedIn } from '../orderFlow/subscriberInformation/subscriber.information.selectors';
import { Location } from '../router/router.selectors';
import { INITIAL_STATE } from './site.reducer';

export const Site = createSelector([
  Client
], (client) => {
  return pathOr(null, ['site'], client);
});

export const LocaleReady = createSelector([
  Site
], (site) => {
  return pathOr(false, ['localeReady'], site);
});

export const HeaderContent = createSelector([
  SelectedBusinessUnit,
  NonProspectIsLoggedIn,
  LocaleReady
], (selectedBusinessUnit, isLoggedIn, localeReady) => {
  if (selectedBusinessUnit === null || !localeReady) {
    return null;
  }
  return buildHeaderContent(selectedBusinessUnit, isLoggedIn);
});

export const FooterContent = createSelector([
  LocaleReady
], (localeReady) => {
  if (!localeReady) {
    return null;
  }
  return buildFooterContent();
});

export const NavigatorContent = createSelector([
  IsDbss,
  Location,
  NonProspectIsLoggedIn
], (isDbss, location, isLoggedIn) => {
  return location ? buildNavigator(location.pathname, isLoggedIn) : null;
});

export const NavigatorIsMobileOnly = createSelector([
  NavigatorContent
], (navigatorContent) => {
  if (navigatorContent) {
    return (!navigatorContent.currentNavItem || isEmpty(navigatorContent.currentNavItem.display));
  }
  return false;
});

export const DeviceType = createSelector([
  Site
], (site) => {
  return path(['deviceType'], site);
});

export const IsRunningIOS = createSelector([
  DeviceType
], (deviceType) => {
  return deviceType === 'ios' || deviceType === '"ios"';
});

export const IsRunningMobile = createSelector([
  DeviceType
], (deviceType) => {
  return JSON.parse(deviceType === 'ios' || deviceType === 'android' || deviceType === '"ios"' || deviceType === '"android"');
});

export const ShouldShowCookieInfo = createSelector([
  Site
], (site) => {
  if (typeof window === 'undefined') {
    return INITIAL_STATE.shouldShowCookieInfo;
  }
  return pathOr(true, ['shouldShowCookieInfo'], site);
});

export const ShouldScroll = createSelector([
  Site
], (site) => {
  return pathOr(false, ['shouldScroll'], site);
});

export const ScrollPosition = createSelector([
  Site
], (site) => {
  return pathOr(false, ['scrollPosition'], site);
});

export const ShouldShowOTTGuidedExperience = createSelector([
  Site,
  IsRunningMobile
], (site, isMobile) => {
  return JSON.parse(pathOr(true, ['shouldShowOTTGuidedExperience'], site)) && isMobile;
});

export const ShouldShowGetHelpOverlay = createSelector([
  Site
], (site) => {
  return pathOr(false, ['shouldShowGetHelpOverlay'], site);
});
