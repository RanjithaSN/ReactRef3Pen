import { CONFIGURATION } from '@selfcare/core/constants/configuration.constants';
import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import sort from 'ramda/src/sort';
import Immutable from 'seamless-immutable';
import { isBroadbandType } from 'selfcare-core/src/redux/offeringContext/offering.context.constants';
import { getRecurringInstances } from '../../components/shop/decision/decision.options.helper';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';

export const PURCHASE_MODE = {
  NEW_PURCHASE: 'NEW_PURCHASE',
  MODIFY: 'MODIFY'
};

export const optionsViewData = (template, periodStringFormatter, t) => {
  return template.PrimaryDecisions.Options.map((option) => {
    const currencyCode = pathOr(null, ['BillerRuleInstanceAmounts', '0', 'CurrencyCode'], option);
    const reocurringInstances = getRecurringInstances(option, currencyCode, periodStringFormatter, template.Language, t);

    return {
      beforeDiscount: enableDiscounts() && reocurringInstances.length && reocurringInstances[0].beforeDiscount,
      cardHeader: option.Name,
      cost: reocurringInstances.length && parseInt(reocurringInstances[0].cost, 10),
      currencyCode,
      id: option.Id
    };
  });
};

const findPrimaryDecisionOptions = (offer, primaryDecisionOptions) => {
  const offerOptions = pathOr([], ['Options'], offer);
  const primaryOptions = pathOr([], ['Options'], primaryDecisionOptions);

  return offerOptions.filter((option) => {
    return primaryOptions.find((item) => {
      return item.Id === option.OfferingOptionPriceId;
    });
  });
};

export const getActivePrimaryOption = (offer, primaryDecision) => {
  const filteredOptions = findPrimaryDecisionOptions(offer, primaryDecision);
  return filteredOptions.find(({ Status }) => Status === OFFERING_OVERALL_STATUS.ACTIVE);
};

export const getInActiveDecisionOption = (offer, primaryDecision) => {
  const filteredOptions = findPrimaryDecisionOptions(offer, primaryDecision);
  return filteredOptions.find(({ Status }) => Status !== OFFERING_OVERALL_STATUS.ACTIVE);
};

export const filterOutPrimaryDecision = (offeringContext) => {
  const decisions = pathOr([], ['Context', 'Decisions'], offeringContext);
  const pages = pathOr([], ['Context', 'Pages'], offeringContext);
  const primaryPackage = pages.find((page) => {
    return page.Name === CONFIGURATION.PAGE_INFO_FOR_PRIMARY_DECISION;
  });

  return decisions.find((decision) => {
    return primaryPackage && decision.PageId === primaryPackage.Id;
  });
};

const sortAndWeightOptions = (options, searchPrimaryDecision, mode, type, feasibilityOptions) => {
  const weightedOptions = options.flatMap((option) => {
    const pricingPlanId = pathOr(null, ['PricingPlanBillerRuleInstances', 'PricingPlanId'], option);

    if (option.Weight !== null && option.Weight !== undefined) {
      return {
        ...option,
        Weight: path(['Weight'], searchPrimaryDecision.OptionPrices.find((item) => {
          return item.PricingPlanId === pricingPlanId;
        }))
      };
    }

    return [];
  });

  const sortedOptions = sort((a, b) => a.Weight - b.Weight, weightedOptions);
  let filteredByMode = sortedOptions;

  switch (mode) {
  case PURCHASE_MODE.MODIFY:
    if (isBroadbandType(type)) {
      if (feasibilityOptions.length) {
        filteredByMode = feasibilityOptions.map((option) => {
          const orgObj = sortedOptions.find(({ PricingPlanBillerRuleInstances }) => option.planid * 1 === PricingPlanBillerRuleInstances.PricingPlanId);
          return {
            ...orgObj,
            feasibilityOption: option
          };
        });
      }
    }
    break;
  default:
    break;
  }

  return filteredByMode;
};

export const addWeightOnPrimaryDecision = (offeringContext, offersMetadata, mode, type, subscriberOffer, feasibilityOptions) => {
  if (offeringContext && offersMetadata) {
    let primaryDecision = filterOutPrimaryDecision(offeringContext);
    const offerFromSearch = offersMetadata[offeringContext.Context.OfferingIds[0]];

    if (offerFromSearch && offerFromSearch.Options && primaryDecision) {
      const primaryDecisionOnSearchOption = offerFromSearch.Options.find((option) => {
        return option.Id === primaryDecision.Id.substring(2);
      });
      primaryDecision = primaryDecision.set('Options', sortAndWeightOptions(primaryDecision.Options, primaryDecisionOnSearchOption, mode, type, feasibilityOptions));
    }

    return primaryDecision;
  }
};

export const getPrimaryDecision = (offeringContext) => {
  const primaryDecision = filterOutPrimaryDecision(offeringContext);
  if (primaryDecision) {
    const decisionsWithoutPrimaryOption = offeringContext.Context.Decisions.filter((decision) => {
      return decision.Id !== primaryDecision.Id;
    });

    return Immutable(offeringContext).setIn(['Context', 'Decisions'], decisionsWithoutPrimaryOption.concat(primaryDecision));
  }

  return offeringContext;
};

export const getPrimaryDecisionAndZeroQuantity = (offeringContext) => {
  const primaryDecision = filterOutPrimaryDecision(offeringContext);
  if (primaryDecision) {
    const updatedPrimaryDecision = {
      ...primaryDecision,
      Options: primaryDecision.Options.map((option) => {
        return Immutable(option).set('Quantity', 0);
      })
    };
    const decisionsWithoutPrimaryOption = offeringContext.Context.Decisions.filter((decision) => {
      return decision.Id !== primaryDecision.Id;
    });

    return Immutable(offeringContext).setIn(['Context', 'Decisions'], decisionsWithoutPrimaryOption.concat(updatedPrimaryDecision));
  }

  return offeringContext;
};
