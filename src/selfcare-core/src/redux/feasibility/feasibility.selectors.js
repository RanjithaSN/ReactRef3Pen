import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return path(['feasibility'], subscriberApi);
});

const FeasibilityData = createSelector([
  Base
], (base) => pathOr(EMPTY_OBJECT, ['data'], base));

const Addresses = createSelector([
  FeasibilityData
], (data) => path(['Success'], JSON.parse(pathOr('null', ['addresses', 'body'], data))));

const SubscriberFeasibilityAddressBody = createSelector([
  FeasibilityData
], (data) => pathOr('null', ['feasibilityAddress', 'body'], data));

export const SubscriberAvailableOffers = createSelector([
  FeasibilityData
], (data) => pathOr(EMPTY_ARRAY, ['offers', 'offers'], data));

export const SubscriberFeasibilityAddress = createSelector([
  SubscriberFeasibilityAddressBody
], (body) => JSON.parse(body));

export const FeasibilityIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const FeasibilityIsLoaded = createSelector([
  FeasibilityIsLoading,
  FeasibilityData
], (isLoading, data) => !isLoading && Boolean(data));

const LETTERS_REG_EX = /[A-Za-z]/;
const NUMBERS_REG_EX = /[0-9]/;
const addressListComparator = (a, b) => {
  if (a.addressName < b.addressName) {
    return -1;
  }
  if (a.addressName > b.addressName) {
    return 1;
  }
  if (a.addressName === b.addressName) {
    let aLoc = a.addressLocation;
    aLoc.replace(LETTERS_REG_EX, '');
    aLoc = aLoc.replace(LETTERS_REG_EX, '');
    aLoc *= 1;
    let bLoc = b.addressLocation;
    bLoc = bLoc.replace(LETTERS_REG_EX, '');
    bLoc *= 1;
    if (aLoc < bLoc) {
      return -1;
    }
    if (aLoc > bLoc) {
      return 1;
    }

    if (aLoc === bLoc) {
      const aStringLoc = a.addressLocation;
      aStringLoc.replace(NUMBERS_REG_EX, '');
      const bStringLoc = b.addressLocation;
      bStringLoc.replace(NUMBERS_REG_EX, '');

      if (aStringLoc < bStringLoc) {
        return -1;
      }
      if (aStringLoc > bStringLoc) {
        return 1;
      }
    }
  }
  return 0;
};

export const AddressList = createSelector([
  Addresses
], (addresses) => {
  return addresses ? addresses.sort(addressListComparator).map((address) => {
    return {
      value: address.id,
      label: `${address.addressName} ${address.addressLocation}`
    };
  }) : EMPTY_ARRAY;
});

export const FeasibilityAttributeData = createSelector(
  FeasibilityData,
  (data) => (path(['attributes', 'addressId'], data) ? {
    address: path(['attributes', 'addressId'], data),
    ossId: `TEMP${Date.now()}${path(['attributes', 'serviceId'], data)}`,
    serviceId: path(['attributes', 'serviceId'], data),
    unitNum: path(['attributes', 'unitName'], data)
  } : EMPTY_OBJECT)
);
