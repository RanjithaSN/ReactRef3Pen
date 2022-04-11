import { ALLOW_COS_MINUTES_BEFORE_RENEWAL } from '../../../constants/product.configuration';
import LocaleKeys from '../../../locales/keys';
import { getProductsNavItem } from '../../../navigation/sitemap.selectors';
import path from 'ramda/src/path';
import differenceInMinutes from 'date-fns/difference_in_minutes';

export const getExecutionDateForOrder = (product, isUpgrade) => {
  const primaryDecisionEndDate = path(['billing', 'unformattedNextChargeDate'], product);
  const beforeEndOfCycle = primaryDecisionEndDate ? new Date(primaryDecisionEndDate) : false;

  if (product.isBroadband) {
    return beforeEndOfCycle.toISOString();
  }

  if (product.isWireless) {
    return isUpgrade || !product.hasPrimaryOption ? false : beforeEndOfCycle.toISOString();
  }
};

export const navigateToProducts = (history) => {
  history.push(getProductsNavItem().url);
};

export const checkToSeeIfProductIsEditable = (product, history, t) => {
  const primaryDecisionEndDate = path(['billing', 'unformattedNextChargeDate'], product);
  if (product.hasFirstUsage && primaryDecisionEndDate && differenceInMinutes(primaryDecisionEndDate, new Date().toUTCString()) < ALLOW_COS_MINUTES_BEFORE_RENEWAL) {
    const instanceId = path(['offeringInstanceId'], product);
    const id = path(['offeringId'], product);
    history.replace(`${getProductsNavItem().url}/${id}-${instanceId}`);
    history.push(`${getProductsNavItem().url}/${id}-${instanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.CURRENTLY_RENEWING)}`);
  }
};

export const getServiceId = (feasilityOffers, updatedFilteredDecision) => {
  let serviceId = path(['feasibilityOption', 'serviceid'], updatedFilteredDecision);

  if (!serviceId) {
    const offer = feasilityOffers.find((item) => item.planid === updatedFilteredDecision.PricingPlanId.toString());

    if (offer) {
      serviceId = offer.serviceid;
    }
  }
  return serviceId;
};
