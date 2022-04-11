import { parseToISOString } from '@selfcare/core/helpers/date.helper';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import sort from 'ramda/src/sort';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberApi } from '../ascendon/ascendon.selectors';
import { IsDbss } from '../configuration/configuration.selectors';
import { CODES } from '../metadata/codes/codes.constants';
import { CodeItems } from '../metadata/codes/codes.selectors';
import { CycleTypeToUse } from './subscriber.offerings.helper';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['subscriberOfferings'], subscriberApi);
});

const SubscriberOfferingsData = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const SubscriberOfferings = createSelector([
  SubscriberOfferingsData
], (data) => {
  return pathOr(EMPTY_ARRAY, ['SubscriberOfferings'], data);
});

export const SubscriberOfferingsIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const SubscriberOfferingsIsLoaded = createSelector([
  SubscriberOfferingsData,
  SubscriberOfferingsIsLoading
], (data, isLoading) => {
  return data !== null && !isLoading;
});

export const SubscriberOfferingsSortedByCycleDate = createSelector([
  SubscriberOfferings
], (offerings) => {
  if (offerings) {
    return sort((a, b) => pathOr(null, ['OfferingDetail', 'Subscription', 'CycleDate'], a) - pathOr(null, ['OfferingDetail', 'Subscription', 'CycleDate'], b), offerings);
  }

  return EMPTY_ARRAY;
});

export const MultipleSubscription = createSelector([
  IsDbss,
  SubscriberOfferingsSortedByCycleDate,
  CodeItems(CODES.SubscriptionBillingCycleType)
], (isDbss, sortedOfferings, cycleTypes) => {
  if (sortedOfferings.length) {
    return sortedOfferings.map((offering) => {
      const cycle = pathOr(null, ['OfferingDetail', 'Subscription', 'Cycle'], offering);
      const cycleTypeToUse = CycleTypeToUse(cycleTypes, cycle);
      const cycleTypeName = path(['Name'], cycleTypeToUse);

      const cycleDate = pathOr(null, ['OfferingDetail', 'Subscription', 'CycleDate'], offering);
      return {
        name: offering.Offering.Name,
        id: offering.Offering.Id,
        offeringInstanceId: offering.OfferingDetail.OfferingInstanceId,
        status: '',
        isLocked: false,
        isPaymentExpired: false,
        thumbnailUrl: pathOr(null, ['Offering', 'ThumbnailUrl'], offering),
        paymentInstrument: null,
        pendingOrderId: null,
        renewAmount: pathOr(null, ['OfferingDetail', 'Subscription', 'RenewAmount'], offering),
        cycleType: cycleTypeName,
        cycleDate: cycleDate ? parseToISOString(cycleDate, true) : undefined,
        currencyCode: pathOr(null, ['Offering', 'CurrencyCode'], offering),
        addOns: offering.OfferingDetail.Options.map((option) => ({
          status: option.Status,
          name: option.ProductName,
          isBaseOffer: option.PlanName === offering.OfferingDetail.Name,
          offeringId: offering.Offering.Id,
          offeringName: offering.Offering.Name,
          offeringInstanceId: offering.OfferingDetail.OfferingInstanceId,
          offeringOptionId: option.OfferingOptionId,
          pendingOrderId: null,
          amount: option.TotalAmount || 0,
          cycleType: cycleTypeName,
          currencyCode: pathOr(null, ['Offering', 'CurrencyCode'], offering),
          thumbnailUrl: ''
        }))
      };
    });
  }

  return sortedOfferings;
});
