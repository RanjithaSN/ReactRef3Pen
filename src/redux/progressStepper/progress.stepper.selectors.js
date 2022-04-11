import { SubscriberIsLoaded } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import i18next from 'i18next';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import LocaleKeys from '../../locales/keys';
import { getAboutBundleNavItem, getAccountNavItem, getSubscriberInformationNavItem } from '../../navigation/sitemap.selectors';
import { Client } from '../client.selectors';
import { ProspectIsAvailable } from '../orderFlow/subscriberInformation/subscriber.information.selectors';
import { SECTION_IDS } from './progress.stepper.constants';

export const CurrentSectionId = createSelector(
  Client,
  (client) => {
    return pathOr(null, ['progressStepper', 'currentSectionId'], client);
  }
);

export const OrderFlowSteps = createSelector(
  SubscriberIsLoaded,
  ProspectIsAvailable,
  (subscriberReady, isProspect) => {
    if (!subscriberReady || isProspect) {
      return [
        {
          id: SECTION_IDS.CONFIGURE,
          label: i18next.t(LocaleKeys.SHOP.CONFIGURE),
          recoverFromRefresh: getAboutBundleNavItem().url,
          checkActiveOffer: true
        },
        {
          id: SECTION_IDS.DETAILS,
          label: i18next.t(LocaleKeys.SHOP.DETAILS),
          recoverFromRefresh: getAboutBundleNavItem().url,
          checkSessionId: true
        }, {
          id: SECTION_IDS.PAYMENT,
          label: i18next.t(LocaleKeys.ORDERING.ORDER_SUMMARY),
          recoverFromRefresh: getSubscriberInformationNavItem().url
        }, {
          id: SECTION_IDS.CONFIRMATION,
          label: i18next.t(LocaleKeys.SHOP.CONFIRMATION),
          recoverFromRefresh: getAccountNavItem().url,
          checkForOrder: true
        }
      ];
    }
    return [
      {
        id: SECTION_IDS.CONFIGURE,
        label: i18next.t(LocaleKeys.SHOP.CONFIGURE),
        recoverFromRefresh: getAboutBundleNavItem().url,
        checkActiveOffer: true
      },
      {
        id: SECTION_IDS.PAYMENT,
        label: i18next.t(LocaleKeys.ORDERING.ORDER_SUMMARY),
        recoverFromRefresh: getAboutBundleNavItem().url,
        checkSessionId: true
      }, {
        id: SECTION_IDS.CONFIRMATION,
        label: i18next.t(LocaleKeys.SHOP.CONFIRMATION),
        recoverFromRefresh: getAccountNavItem().url,
        checkForOrder: true
      }
    ];
  }
);
