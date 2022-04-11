import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import { OfferingExternalReferenceData } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { AllExternalDisplayNames, ProductOriginalNames } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { QuoteData, QuoteItems } from '@selfcare/core/redux/quote/quote.selectors';
import { SavedShoppingCart } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { SubmitOrderData } from '@selfcare/core/redux/submitOrder/submit.order.selectors';
import { ActivationDateFromAttributes } from '../products/products.selectors';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import pluck from 'ramda/src/pluck';
import { createSelector } from 'reselect';
import LocaleKeys from '../../locales/keys';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import sum from 'ramda/src/sum';
import isNil from 'ramda/src/isNil';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';

const EMPTY_ARRAY = [];

export const AddOnOrderItems = createSelector(
  SavedShoppingCart,
  (cart) => {
    const items = pathOr([], ['Items'], cart);

    return {
      AddItems: items
    };
  }
);

export const ListOfQuoteItemsWithAmounts = createSelector(
  QuoteItems,
  OfferingExternalReferenceData,
  (items, externalRefIds) => {
    const playOfferId = path([AllExternalDisplayNames.PLAY, 'offerId'], externalRefIds);
    return items.filter(({ Amount, OfferingId }) => (Amount > 0 || OfferingId === playOfferId));
  }
);

export const DisplayListOfQuoteItems = createSelector([
  ListOfQuoteItemsWithAmounts,
  QuoteData,
  SelectedLocale
], (items, quote, locale) => {
  if (!items.length) {
    return items;
  }

  return items.map((item) => {
    const originalAmount = pathOr(0, ['BillerRuleQuoteItems', 0, 'SubTotalAmount'], item);
    const totalAmount = pathOr(0, ['BillerRuleQuoteItems', 0, 'TotalAmount'], item);
    const hasDiscount = enableDiscounts() && originalAmount !== totalAmount;
    return {
      label: pathOr(null, ['PricingPlan', 'PricingPlanName'], item),
      value: formatCurrency(totalAmount, quote.Currency, locale),
      originalValue: hasDiscount ? formatCurrency(originalAmount, quote.Currency, locale) : null
    };
  });
});

export const QuoteHasPlay = createSelector(
  ListOfQuoteItemsWithAmounts,
  OfferingExternalReferenceData,
  (quoteItems, externalRefIds) => {
    const playOfferId = path([AllExternalDisplayNames.PLAY, 'offerId'], externalRefIds);
    return Boolean(quoteItems.find((item) => path(['OfferingId'], item) === playOfferId));
  }
);

export const QuoteHasBenify = createSelector(
  ListOfQuoteItemsWithAmounts,
  OfferingExternalReferenceData,
  (quoteItems, externalRefIds) => {
    const playOfferId = path([AllExternalDisplayNames.BENIFY, 'offerId'], externalRefIds);
    return Boolean(quoteItems.find((item) => path(['OfferingId'], item) === playOfferId));
  }
);

export const OneTimeAndRecurringQuoteTotals = createSelector([
  QuoteData,
  SelectedLocale
], (quote, locale) => {
  if (quote) {
    const billerRuleTotals = pathOr([], ['BillerRuleQuoteItems'], quote);
    const oneTimeTotals = billerRuleTotals.filter((total) => {
      return total.BillerRuleInstanceType === BILLER_RULE_INSTANCE_TYPES.ONE_TIME;
    });
    const recurringTotals = billerRuleTotals.filter((total) => {
      return total.BillerRuleInstanceType === BILLER_RULE_INSTANCE_TYPES.RECURRING;
    });

    return {
      oneTimeTotal: formatCurrency(sum(pluck('TotalAmount', oneTimeTotals)), quote.Currency, locale),
      recurringTotal: formatCurrency(sum(pluck('TotalAmount', recurringTotals)), quote.Currency, locale)
    };
  }

  return null;
});

export const SubmitOrderProductList = createSelector([
  ActivationDateFromAttributes,
  SubmitOrderData,
  OfferingExternalReferenceData,
  SelectedLocale
], (activationDateFromAttributes, order, externalRefIds, locale) => {
  const mobileOfferId = path([AllExternalDisplayNames.MOBILE, 'offerId'], externalRefIds);
  const studentMobileOfferId = path([AllExternalDisplayNames.STUDENT_MOBILE, 'offerId'], externalRefIds);
  const mobileCampaignOfferId = path([AllExternalDisplayNames.CAMPAIGN_MOBILE, 'offerId'], externalRefIds);
  const playOfferId = path([AllExternalDisplayNames.PLAY, 'offerId'], externalRefIds);
  const benifyOfferId = path([AllExternalDisplayNames.BENIFY, 'offerId'], externalRefIds);
  const broadbandOfferId = path([AllExternalDisplayNames.BROADBAND, 'offerId'], externalRefIds);
  const studentBroadbandOfferId = path([AllExternalDisplayNames.STUDENT_BROADBAND, 'offerId'], externalRefIds);
  const broadbandCampaignOfferId = path([AllExternalDisplayNames.CAMPAIGN_BROADBAND, 'offerId'], externalRefIds);

  const itemsWithCost = pathOr(EMPTY_ARRAY, ['Items'], order).filter((item) => {
    const isBenifyOffer = path(['OfferingId'], item) === benifyOfferId;
    const isMobileOffer = path(['OfferingId'], item) === mobileOfferId || path(['OfferingId'], item) === studentMobileOfferId || path(['OfferingId'], item) === mobileCampaignOfferId;
    const isPlayOffer = path(['OfferingId'], item) === playOfferId;
    const isBroadband = path(['OfferingId'], item) === broadbandCampaignOfferId || path(['OfferingId'], item) === studentBroadbandOfferId || path(['OfferingId'], item) === broadbandOfferId;
    const name = pathOr(EMPTY_ARRAY, ['PricingPlan', 'Name'], item);

    if ((isBroadband && name.includes(ProductOriginalNames.BROADBAND)) || isPlayOffer) {
      return true;
    }

    if (isBenifyOffer || isMobileOffer && name.includes(ProductOriginalNames.MOBILE)) {
      return pathOr(EMPTY_ARRAY, ['PricingPlan', 'BillerRuleInstanceThumbnails'], item).find((bri) => {
        return pathOr(false, ['Amount'], bri) > 0;
      });
    }

    return false;
  });

  const getCampaignName = (item) => {
    let displayName = path(['PricingPlan', 'Name'], item);

    if (path(['OfferingId'], item) === studentMobileOfferId || path(['OfferingId'], item) === studentBroadbandOfferId) {
      displayName = 'Penny Student';
    }

    return displayName;
  };

  const mapped = itemsWithCost.map((item) => {
    const isBenifyOffer = path(['OfferingId'], item) === benifyOfferId;
    const isMobileOffer = path(['OfferingId'], item) === mobileOfferId || path(['OfferingId'], item) === studentMobileOfferId || path(['OfferingId'], item) === mobileCampaignOfferId;
    const isPlayOffer = path(['OfferingId'], item) === playOfferId;
    const isBroadbandOffer = path(['OfferingId'], item) === broadbandOfferId || path(['OfferingId'], item) === studentBroadbandOfferId || path(['OfferingId'], item) === broadbandCampaignOfferId;
    const ordinaryAmount = pathOr(0, ['Amount'], item.PricingPlan.BillerRuleInstanceThumbnails.find((value) => !isNil(value.Amount)));
    const discountAmount = pathOr(0, ['Discounts', '0', 'Discount', 'Amount'], item);
    const currencyCode = pathOr('SEK', ['PricingPlan', 'BillerRuleInstanceThumbnails', '0', 'CurrencyCode'], item);
    const pricingPlanName = pathOr(0, ['PricingPlan', 'PricingPlanName'], item);
    const discountRenewalCount = pathOr(0, ['Discounts', '0', 'Discount', 'RenewalCount'], item);
    const discountMonthsLimit = discountRenewalCount + 1;
    const hasDiscount = enableDiscounts() && discountAmount > 0;
    const discountedAmount = ordinaryAmount - discountAmount;
    const activationDate = !isPlayOffer ? activationDateFromAttributes : new Date();

    return {
      address: (isMobileOffer || isPlayOffer) ? LocaleKeys.ORDERING.LEGAL_ADDRESS : LocaleKeys.ORDERING.FEASIBILITY_ADDRESS,
      id: path(['OfferingInstanceId'], item),
      altId: path(['OfferingId'], item),
      label: path(['PricingPlan', 'Name'], item),
      shipping: (isMobileOffer || isPlayOffer) ? LocaleKeys.ORDERING.SHIPPING_TIME_MOBILE : LocaleKeys.ORDERING.SHIPPING_TIME_FIXED,
      isMobileOffer: isMobileOffer || isBenifyOffer,
      isBenifyOffer,
      isBroadbandOffer,
      isPlayOffer,
      hasDiscount,
      campaignLabel: getCampaignName(item),
      pricingPlanName,
      ordinaryAmount,
      locale,
      discountedAmount,
      currencyCode,
      discountMonthsLimit,
      activationDate
    };
  });
  return mapped;
});
