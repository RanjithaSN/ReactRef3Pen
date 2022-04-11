import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import { CONFIGURATION } from '@selfcare/core/constants/configuration.constants';
import { CatalogSearchResults } from '@selfcare/core/redux/catalog/catalog.selectors';
import { ConvergentBillerSummaryServices } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.selectors';
import { LockerItems } from '@selfcare/core/redux/locker/locker.selectors';
import { Base as ProductBase } from '@selfcare/core/redux/metadata/products/products.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { Base as ProductContextBase } from '@selfcare/core/redux/productContext/product.context.selectors';
import { CurrentLocation } from '@selfcare/core/redux/session/session.selectors';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

export const TopUpId = createSelector(
  CatalogSearchResults,
  (catalogResults) => path(['Id'], catalogResults.find(({ Name }) => Name === CONFIGURATION.PRODUCT_INFO_FOR_TOP_UP_DECISION))
);

export const RoamLikeHomeId = createSelector(
  CatalogSearchResults,
  (catalogResults) => path(['Id'], catalogResults.find(({ Name }) => Name === CONFIGURATION.PRODUCT_INFO_FOR_ROAM_LIKE_HOME))
);

export const InternationalRoamingId = createSelector(
  CatalogSearchResults,
  (catalogResults) => path(['Id'], catalogResults.find(({ Name }) => Name === CONFIGURATION.PRODUCT_INFO_FOR_INTERNATIONAL_ROAMING))
);

export const TopUpReadyToLoad = createSelector(
  TopUpId,
  ProductBase,
  ProductContextBase,
  (topUpId, productBaseObj, productContextBase) => {
    const product = path([topUpId, 'status'], productBaseObj);
    const productContext = path([topUpId, 'status'], productContextBase);
    return Boolean(topUpId && !product && !productContext);
  }
);

export const EXTERNAL_REFENCE_FOR_ISO_COUNTRIES = 'ISO_COUNTRY_NAME';
const formatServiceFeatures = (serviceFeatureId, productBaseObj, productContextBase, location, selectedLocale, showAll) => {
  const product = pathOr(EMPTY_OBJECT, [serviceFeatureId, 'product'], productBaseObj);
  const orderablePricingPlans = pathOr(EMPTY_ARRAY, [serviceFeatureId, 'data', 'ProductContext', 'OrderablePricingPlans'], productContextBase);
  return orderablePricingPlans.reduce((result, context) => {
    const foundPricingPlan = pathOr(EMPTY_ARRAY, ['PricingPlans'], product).find((obj) => obj.Id === context.Id);
    if (foundPricingPlan) {
      const foundBillerRuleInstance = pathOr(EMPTY_ARRAY, ['BillerRuleInstances'], foundPricingPlan).find((bri) => bri.Type === BILLER_RULE_INSTANCE_TYPES.ONE_TIME);
      const whereAvailable = pathOr(EMPTY_ARRAY, ['AdditionalProperties'], foundPricingPlan).find(({ ExternalReference }) => ExternalReference === EXTERNAL_REFENCE_FOR_ISO_COUNTRIES);
      if (showAll || (!location || pathOr('', ['Values', 0], whereAvailable).indexOf(location) !== -1)) {
        result.push({
          id: pathOr('', ['Id'], context).toString(),
          cardHeader: path(['Name'], foundPricingPlan),
          cost: path(['Amount'], foundBillerRuleInstance),
          currencyCode: path(['Currency'], context),
          currencyLocale: selectedLocale
        });
      }
    }
    return result;
  }, []);
};

export const AvailableTopUps = createSelector(
  TopUpId,
  ProductBase,
  ProductContextBase,
  SelectedLocale,
  (topUpId, productBaseObj, productContextBase, selectedLocale) => (
    formatServiceFeatures(topUpId, productBaseObj, productContextBase, false, selectedLocale)
  )
);

export const AvailableRoamLikeHome = createSelector(
  RoamLikeHomeId,
  ProductBase,
  ProductContextBase,
  SelectedLocale,
  CurrentLocation,
  (roamLikeHome, productBaseObj, productContextBase, selectedLocale, location) => (
    formatServiceFeatures(roamLikeHome, productBaseObj, productContextBase, location, selectedLocale)
  )
);

const AllInternationalRoaming = createSelector(
  InternationalRoamingId,
  ProductBase,
  ProductContextBase,
  SelectedLocale,
  CurrentLocation,
  (roaming, productBaseObj, productContextBase, selectedLocale, location) => (
    formatServiceFeatures(roaming, productBaseObj, productContextBase, location, selectedLocale, true)
  )
);

export const AvailableInternationalRoaming = createSelector(
  InternationalRoamingId,
  ProductBase,
  ProductContextBase,
  SelectedLocale,
  CurrentLocation,
  (roaming, productBaseObj, productContextBase, selectedLocale, location) => (
    formatServiceFeatures(roaming, productBaseObj, productContextBase, location, selectedLocale, true)
  )
);

export const RoamingByServiceId = createSelector(
  ConvergentBillerSummaryServices,
  LockerItems,
  RoamLikeHomeId,
  AvailableRoamLikeHome,
  InternationalRoamingId,
  AvailableInternationalRoaming,
  CurrentLocation,
  (services, lockerItems, roamLikeHomeId, availableRoamLikeHome, internationalRoamingId, availableInternationalRoaming, location) => {
    const data = {};
    services.forEach((service) => {
      const serviceId = path(['ServiceIdentifier', 'Value'], service);
      data[serviceId] = {
        hasRoamLikeHome: false,
        hasRoamForHere: false,
        location
      };
      pathOr(EMPTY_ARRAY, ['EntitlementBalances'], service).forEach((entitlement) => {
        if (path(['BalanceRemaining'], entitlement) > 0) {
          const subscriberProductId = path(['EntitlementIdentifier', 'SubscriberProductId'], entitlement);
          const lockerItem = lockerItems.find(({ Id }) => Id === subscriberProductId);
          if (path(['Product', 'Id'], lockerItem) === roamLikeHomeId && availableRoamLikeHome.length) {
            data[serviceId] = {
              hasRoamLikeHome: true,
              hasRoamForHere: false,
              entitlement,
              location
            };
          } else if (path(['Product', 'Id'], lockerItem) === internationalRoamingId && availableInternationalRoaming.length) {
            availableInternationalRoaming.forEach((roaming) => {
              if (path(['id'], roaming) && path(['id'], roaming) === `${path(['PricingPlan', 'Id'], lockerItem)}`) {
                data[serviceId] = {
                  hasRoamLikeHome: false,
                  hasRoamForHere: true,
                  entitlement,
                  location
                };
              }
            });
          }
        }
      });
    });
    return data;
  }
);

export const UnfilteredRoamingByServiceId = createSelector(
  ConvergentBillerSummaryServices,
  LockerItems,
  RoamLikeHomeId,
  AvailableRoamLikeHome,
  InternationalRoamingId,
  AllInternationalRoaming,
  CurrentLocation,
  (services, lockerItems, roamLikeHomeId, availableRoamLikeHome, internationalRoamingId, allInternationalRoaming, location) => {
    const data = {};
    services.forEach((service) => {
      const serviceId = path(['ServiceIdentifier', 'Value'], service);
      data[serviceId] = {
        hasRoamLikeHome: false,
        hasRoamForHere: false,
        location
      };
      pathOr(EMPTY_ARRAY, ['EntitlementBalances'], service).forEach((entitlement) => {
        const subscriberProductId = path(['EntitlementIdentifier', 'SubscriberProductId'], entitlement);
        const lockerItem = lockerItems.find(({ Id }) => Id === subscriberProductId);
        if (path(['Product', 'Id'], lockerItem) === roamLikeHomeId && availableRoamLikeHome.length) {
          if (data[serviceId].entitlements) {
            // Use if since something else may have set it to true and the true is an 'any' flag
            if (path(['BalanceRemaining'], entitlement) > 0) {
              data[serviceId].hasRoamLikeHome = true;
            }
            data[serviceId].entitlements.push(entitlement);
          } else {
            data[serviceId] = {
              hasRoamLikeHome: path(['BalanceRemaining'], entitlement) > 0,
              hasRoamForHere: false,
              entitlements: [entitlement],
              location
            };
          }
        } else if (path(['Product', 'Id'], lockerItem) === internationalRoamingId && allInternationalRoaming.length) {
          allInternationalRoaming.forEach((roaming) => {
            if (path(['id'], roaming) && path(['id'], roaming) === `${path(['PricingPlan', 'Id'], lockerItem)}`) {
              if (data[serviceId].entitlements) {
                // Use if since something else may have set it to true and the true is an 'any' flag
                if (path(['BalanceRemaining'], entitlement) > 0) {
                  data[serviceId].hasRoamForHere = true;
                }
                data[serviceId].entitlements.push(entitlement);
              } else {
                data[serviceId] = {
                  hasRoamLikeHome: false,
                  hasRoamForHere: path(['BalanceRemaining'], entitlement) > 0,
                  entitlements: [entitlement],
                  location
                };
              }
            }
          });
        }
      });
    });
    return data;
  }
);
