import { IsOfferingMetadataStatusLoading } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { SubscriberIsLoading } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { SubscriberInventoryIsLoading } from '@selfcare/core/redux/subscriberInventory/subscriber.inventory.selectors';
import { SubscriberOfferings, SubscriberOfferingsIsLoading } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = new Immutable({});

export const ServiceIdentifierValueLookup = createSelector(
  SubscriberOfferings,
  (offerings) => (
    offerings.reduce((_, { OfferingDetail: { Options } }) => (
      Options.reduce((__, { ServiceAttributeValues, ServiceIdentifierValue }) => (
        (ServiceAttributeValues || []).reduce((result, { Value }) => (
          ServiceIdentifierValue ? result.set(Value, ServiceIdentifierValue) : result
        ), __)
      ), _)
    ), EMPTY_OBJECT))
);

export const ServiceIdLookup = createSelector(
  SubscriberOfferings,
  (offerings) => (
    offerings.reduce((_, { OfferingDetail: { Options } }) => (
      Options.reduce((__, { ServiceAttributeValues }) => (
        (ServiceAttributeValues || []).reduce((result, { Value, ServiceId }) => (
          ServiceId ? result.set(Value, ServiceId) : result
        ), __)
      ), _)
    ), EMPTY_OBJECT)
  )
);

export const FormattedSubscriberOfferings = createSelector(
  SubscriberOfferings,
  (offerings) => (
    offerings.map((offer) => ({
      ConnectedDate: pathOr(null, ['OfferingDetail', 'ConnectedDate'], offer),
      CurrencyCode: pathOr(null, ['Offering', 'CurrencyCode'], offer),
      DiscountTotal: pathOr(0, ['DiscountTotal'], offer),
      DisplayName: pathOr(null, ['OfferingDetail', 'DisplayName'], offer),
      Name: pathOr(null, ['OfferingDetail', 'Name'], offer),
      OfferingId: pathOr(null, ['OfferingDetail', 'OfferingId'], offer),
      OfferingInstanceId: pathOr(null, ['OfferingDetail', 'OfferingInstanceId'], offer),
      Options: pathOr(EMPTY_ARRAY, ['OfferingDetail', 'Options'], offer),
      ServiceFeatures: pathOr(EMPTY_ARRAY, ['OfferingDetail', 'ServiceFeatures'], offer),
      Status: pathOr(offer.OfferingDetail.Status, ['OfferingDetail', 'Subscription', 'Status'], offer),
      Total: pathOr(0, ['Total'], offer),
      TotalAmount: pathOr(0, ['OfferingDetail', 'TotalAmount'], offer),
      ThumbnailUrl: pathOr('', ['Offering', 'ThumbnailUrl'], offer)
    }))
  )
);

export const ServiceProp = (state, { service }) => service;

export const ServiceId = createSelector(
  ServiceIdLookup,
  ServiceProp,
  (lookup, service) => pathOr(null, [service], lookup)
);

export const ServiceIdentifierValue = createSelector(
  ServiceIdentifierValueLookup,
  ServiceProp,
  (lookup, service) => pathOr(null, [service], lookup)
);

export const SubscriberRelatedInformationIsLoading = createSelector([
  SubscriberIsLoading,
  SubscriberOfferingsIsLoading,
  SubscriberInventoryIsLoading,
  IsOfferingMetadataStatusLoading
], (subscriberLoading, subscriberOfferingsLoading, subscriberInventoryLoading, offerMetadataLoading) => {
  return subscriberLoading || subscriberOfferingsLoading || subscriberInventoryLoading || offerMetadataLoading;
});
