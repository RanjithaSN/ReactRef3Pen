import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import { FallbackCurrencyLocale } from '@selfcare/core/constants/transaction.constants';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import sort from 'ramda/src/sort';
import { isMobileType } from 'selfcare-core/src/redux/offeringContext/offering.context.constants';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import LocaleKeys from '../../../locales/keys';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';

const getLabel = (briThumbnail, instance, periodStringFormatter, t) => {
  if (briThumbnail) {
    if (briThumbnail.FullUpfrontPayment) {
      return t(LocaleKeys.PERIODS.ONE_TIME);
    }
    return periodStringFormatter(briThumbnail).join(' ');
  }

  return instance.Name;
};

export const getRecurringInstances = (option, currencyCode, periodStringFormatter, selectedLocale, t) => {
  return option.BillerRuleInstanceAmounts
    .filter((instance) => [
      BILLER_RULE_INSTANCE_TYPES.RECURRING,
      BILLER_RULE_INSTANCE_TYPES.SUBSCRIPTION,
      BILLER_RULE_INSTANCE_TYPES.FINANCE
    ].includes(instance.Type))
    .map((instance) => {
      const isFinance = instance.Type === BILLER_RULE_INSTANCE_TYPES.FINANCE;
      const briThumbnail = option.BillerRuleInstanceThumbnails
        .find((thumbnail) => thumbnail.Type === instance.Type);
      return {
        key: instance.BillerRuleConfigurationId,
        label: getLabel(briThumbnail, instance, periodStringFormatter, t),
        cost: formatCurrency(
          isFinance ? instance.TermAmount : instance.Amount,
          currencyCode,
          selectedLocale
        ),
        note: isFinance ?
          `${formatCurrency(instance.Amount, currencyCode, selectedLocale)}: ${t(LocaleKeys.OFFER_DECISION.FULL_RETAIL_PRICE)}` : null
      };
    });
};

export const getAllowanceViewData = (offer) => {
  const optionPrices = pathOr([], ['Options', 0, 'OptionPrices'], offer);
  const sortedOptionPrices = sort((a, b) => a.Weight - b.Weight, optionPrices);
  const pricingPlanThumbnails = pathOr([], ['PricingPlanThumbnails'], offer);

  return sortedOptionPrices.map((option) => {
    const pricingPlan = pricingPlanThumbnails[option.PricingPlanId];

    return {
      cardHeader: pricingPlan ? pricingPlan.Name : '',
      id: option.Id,
      amount: pathOr(0, ['BillerRuleInstanceThumbnails', 0, 'Amount'], pricingPlan)
    };
  });
};


export const inferCategoryByType = (template, isBundle) => {
  if (isMobileType(template)) {
    return {
      list: isBundle ? 'Bundle' : 'Mobile',
      category: 'Mobil' // Previously Wireless
    };
  }
  return {
    list: isBundle ? 'Bundle' : 'Broadband',
    category: 'Broadband'
  };
};

const getSizeDisplayData = (template, size, isInBundleOrderFlow) => {
  // The higher size labels correspond to the lower-end offer decisions
  const labels = ['Size1', 'Size2', 'Size3', 'Size4'];
  const uspListItems = ['USP1', 'USP2', 'USP3'].map((key) => ({
    key,
    description: template[`${labels[size]}${key}`]
  })).filter((uspItem) => uspItem.description);
  const analyticsValues = inferCategoryByType(template, isInBundleOrderFlow);
  return {
    data: template[`${labels[size]}Data`],
    download: template[`${labels[size]}Download`],
    description: template[`${labels[size]}Description`],
    name: template[`${labels[size]}Name`],
    price: template[`${labels[size]}Price`],
    upload: template[`${labels[size]}Upload`],
    duration: template.WhatsIncluded,
    uspListItems,
    category: analyticsValues.category,
    list: analyticsValues.list
  };
};

export const getOptionsViewData = (template, isPurchaseNew, isInBundleOrderFlow = false, offersMeta = {}) => {
  if (template === null || template === undefined) {
    return [];
  }
  const primaryDecisionOptions = pathOr([], ['PrimaryDecisions', 'Options'], template);
  const locale = path(['PreferenceLocale'], template);
  if (template.FeasibilityOffers && isPurchaseNew && primaryDecisionOptions.length) {
    const displayDataValue = template.FeasibilityOffers.map((offer, i) => {
      const sizeDisplayData = getSizeDisplayData(template, primaryDecisionOptions.length - i - 1, isInBundleOrderFlow);
      const pricingPlanThumbnail = path(['PricingPlanThumbnails', offer.planid], template);
      const primaryOptionWithSamePlanId = pathOr([], ['PrimaryDecisions', 'Options'], template).find((option) => {
        return String(pathOr(null, ['PricingPlanBillerRuleInstances', 'PricingPlanId'], option)) === offer.planid;
      });

      const billingInstanceThumbnail = path(['BillerRuleInstanceThumbnails', '0'], pricingPlanThumbnail);
      const templateOptions = pathOr([], ['Options'], offersMeta[template.Id] ? offersMeta[template.Id] : template);

      const originalAmount = pathOr(0, ['Amount'], primaryOptionWithSamePlanId);
      const discountAmount = pathOr(0, ['DiscountAmount'], primaryOptionWithSamePlanId);
      const hasDiscount = enableDiscounts() && discountAmount > 0;
      const options = templateOptions.find(({ Id }) => template.PrimaryDecisions && Id === template.PrimaryDecisions.Id.slice(2));

      return {
        beforeDiscount: hasDiscount ? originalAmount : null,
        cost: hasDiscount ? originalAmount - discountAmount : originalAmount,
        currencyCode: pathOr(FallbackCurrencyLocale, ['CurrencyCode'], billingInstanceThumbnail),
        id: options.OptionPrices.find(({ PricingPlanId }) => PricingPlanId.toString() === offer.planid).Id,
        pricingPlanId: options.OptionPrices.find(({ PricingPlanId }) => PricingPlanId.toString() === offer.planid).PricingPlanId,
        feasibilityOffer: offer,
        currencyLocale: locale,
        sizeDisplayData
      };
    });
    return displayDataValue;
  }

  const displayDataValue = primaryDecisionOptions.map((option, i) => {
    const sizeDisplayData = getSizeDisplayData(template, primaryDecisionOptions.length - i - 1, isInBundleOrderFlow);
    const currencyCode = pathOr(FallbackCurrencyLocale, ['BillerRuleInstanceAmounts', '0', 'CurrencyCode'], option);
    const originalAmount = pathOr(0, ['PricingPlanBillerRuleInstances', 'RecurringBillerRuleInstances', '0', 'BillerRuleInstanceCharges', '0', 'ChargeAmount'], option);
    const discountAmount = pathOr(0, ['DiscountAmount'], option);
    const hasDiscount = enableDiscounts() && discountAmount > 0;
    return {
      id: option.Id,
      pricingPlanId: option.PricingPlanId,
      beforeDiscount: hasDiscount ? originalAmount : null,
      cost: originalAmount - discountAmount,
      currencyCode,
      currencyLocale: locale,
      sizeDisplayData
    };
  });
  return displayDataValue;
};

/**
 *
 * @param {*} template
 * @param {*} isPurchaseNew
 * @param {*} pricingPlanIds
 */
export const getOptionsViewDataByPricingPlanIds = (template, isPurchaseNew, pricingPlanIds, isInBundleOrderFlow, offeringsMeta) => {
  return getOptionsViewData(template, isPurchaseNew, isInBundleOrderFlow, offeringsMeta).filter((plan) => {
    return pricingPlanIds.indexOf(plan.pricingPlanId) > -1;
  });
};

/**
 *
 * @param {*} offeringContextShoppingCart
 */
export const getPricingPlanIdsFromOfferingContextShoppingCart = (offeringContextShoppingCart) => {
  const items = offeringContextShoppingCart.Items;
  const pricingPlanIds = (items.map((item) => item.PricingPlanId));
  return pricingPlanIds;
};

/**
 *
 * @param {*} savedContextShoppingCart
 */
export const getPricingPlanIdsFromSavedShoppingCart = (savedShoppingCart) => {
  const items = savedShoppingCart.Items;
  const pricingPlanIds = (items.map((item) => item.PricingPlanId));
  return pricingPlanIds;
};

/**
 *
 * @param {*} submittedOrder
 */
export const getPricingPlanIdsFromSavedSubmittedOrder = (submittedOrder) => {
  const items = submittedOrder.Order.Items;
  const pricingPlanIds = (items.map((item) => item.Details.PricingPlan.Id));
  return pricingPlanIds;
};
