import i18next from 'i18next';
import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import LocaleKeys from '../../locales/keys';
import { SubscriberApi } from '../ascendon/ascendon.selectors';
import { DEFAULT_ADDRESS_IDS } from './address.constants';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['address'], subscriberApi);
});

export const AreAddressesLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const AreAddressesLoaded = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoaded'], base);
});

export const SubscriberAddresses = createSelector([
  Base
], (base) => {
  return pathOr(EMPTY_ARRAY, ['data'], base);
});

export const friendlyAddress = (address) => (address ? Immutable({
  name: address.Name,
  id: address.Id,
  addressLine1: address.LineOne,
  addressLine2: address.LineTwo,
  city: address.City,
  country: address.Country,
  postalCode: address.PostalCode,
  region: address.State,
  defaults: [{
    id: DEFAULT_ADDRESS_IDS.BILLING,
    label: i18next.t(LocaleKeys.ADDRESS.BILLING),
    value: address.DefaultBilling || false
  }, {
    id: DEFAULT_ADDRESS_IDS.SERVICE,
    label: i18next.t(LocaleKeys.ADDRESS.SERVICE),
    value: address.DefaultService || false
  }, {
    id: DEFAULT_ADDRESS_IDS.SHIPPING,
    label: i18next.t(LocaleKeys.ADDRESS.SHIPPING),
    value: address.DefaultShipping || false
  }]
}) : null);

// A subscriber can potentially have multiple addresses, such as business, home, service.
// Eventually, we will want to add that logic here to represent which one should be displayed to the user
export const DefaultBillingAddress = createSelector([
  SubscriberAddresses
], (addresses) => {
  return friendlyAddress(addresses.find((address) => address.DefaultBilling));
});
