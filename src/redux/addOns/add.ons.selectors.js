import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { CodeItems } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { Client } from '../client.selectors';
import { FormattedSubscriberOfferings, ServiceIdLookup } from '../subscriberOfferings/subscriber.offerings.selectors';

const SERVICE_FEATURE = 'Service Feature';

export const SERVICE_FEATURE_STATUS = {
  ACTIVE: 1,
  REMOVED: 2,
  PENDING_ACTIVE: 3,
  PENDING_REMOVED: 4,
  EXPIRED: 5
};

export const Base = createSelector(
  Client,
  (client) => pathOr(null, ['addOns'], client)
);

export const AddOnCode = createSelector([
  CodeItems(CODES.ProductClassification)
], (codeItems) => {
  return pathOr(null, ['Value'], codeItems.find((item) => item.Name === SERVICE_FEATURE));
});

export const ExistingPlanQuantitiesByServiceId = createSelector([
  FormattedSubscriberOfferings,
  ServiceIdLookup
], (offerings, lookup) => {
  const serviceFeatures = offerings.reduce((result, offering) => {
    if (offering.ServiceFeatures) {
      return result.concat(offering.ServiceFeatures);
    }

    return result;
  }, []);

  return serviceFeatures.reduce((plansByServiceId, { ServiceAttributeValues, ProductId, PricingPlanId, Status }) => {
    return ServiceAttributeValues.reduce((result, { Value }) => {
      const serviceId = pathOr(null, [Value], lookup);
      if (Status === SERVICE_FEATURE_STATUS.ACTIVE && serviceId) {
        return result.updateIn(
          [serviceId, Value, ProductId, PricingPlanId],
          (oldQuantity = 0) => oldQuantity + 1
        );
      }

      return result;
    }, plansByServiceId);
  }, Immutable({}));
});
