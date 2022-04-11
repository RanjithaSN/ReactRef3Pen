import * as LocalStorageHelper from '@selfcare/core/helpers/storage/local.storage';
import { THREE_DS_1_MD, THREE_DS_1_PARES, THREE_DS_1_PAYMENT_DATA, THREE_DS_1_PROCESSING } from '@selfcare/core/redux/utils/api.constants';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import {
  getAccountNavItem,
  getCheckoutNavItem,
  getPaymentMethodsNavItem, getShopNavItem
} from '../../navigation/sitemap.selectors';
import { Client } from '../client.selectors';
import AppConfig from 'AppConfig';

const Base = createSelector([
  Client
], (client) => {
  return path(['threeDS'], client);
});

export const Current3DS1MDValue = createSelector([
  Base
], (base) => {
  return pathOr(LocalStorageHelper.read(THREE_DS_1_MD) || null, ['current3DS1MDValue'], base);
});

export const Current3DS1PaResValue = createSelector([
  Base
], (base) => {
  return pathOr(LocalStorageHelper.read(THREE_DS_1_PARES) || null, ['current3DS1PaResValue'], base);
});

export const Current3DS1PaymentDataValue = createSelector([
  Base
], (base) => {
  return pathOr(LocalStorageHelper.read(THREE_DS_1_PAYMENT_DATA) || null, ['current3DS1PDValue'], base);
});

export const Processing3DS = createSelector([
  Base
], (base) => {
  return pathOr(LocalStorageHelper.read(THREE_DS_1_PROCESSING) || false, ['processing3DSPaymentInstrument'], base);
});

export const ThreeDS1RedirectUrl = createSelector([
  Base
], (base) => {
  return pathOr(null, ['threeDS1RedirectUrl'], base);
});

const WindowLocation = createSelector([], () => {
  return window.location.origin;
});

export const ThreeDS1BaseRedirectUrl = createSelector([
  WindowLocation
], (windowLocation) => {
  if (windowLocation.includes('localhost')) {
    return `https://${AppConfig.ENVIRONMENT_NAME}-selfcare.tele2.ascendon.tv`;
  }
  return windowLocation;
});

export const ThreeDS1PaymentInstrumentRedirectUrl = createSelector([
  ThreeDS1BaseRedirectUrl
], (baseRedirectUrl) => {
  return `${baseRedirectUrl}/${getAccountNavItem().id}/${getPaymentMethodsNavItem().id}`;
});

export const ThreeDS1SubmitOrderRedirectUrl = createSelector([
  ThreeDS1BaseRedirectUrl
], (baseRedirectUrl) => {
  return `${baseRedirectUrl}/${getShopNavItem().id}/${getCheckoutNavItem().id}`;
});
