import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import { FallbackCurrencyLocale } from '@selfcare/core/constants/transaction.constants';
import { SubscriberAvailableOffers } from '@selfcare/core/redux/feasibility/feasibility.selectors';
import { MarketingTemplatesBasedOnOffers } from '@selfcare/core/redux/marketingTemplates/marketing.templates.selectors';
import { OfferingExternalReferenceData, OfferingsMetadata } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { AllExternalDisplayNames, OfferingContextIntent } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { IsOfferingContextStatusLoading } from '@selfcare/core/redux/offeringContext/offering.context.selectors';
import { DefaultPaymentInstrument } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { QuoteData } from '@selfcare/core/redux/quote/quote.selectors';
import { SavedShoppingCart } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { SearchOffersOfferings } from '@selfcare/core/redux/searchOffers/search.offers.selectors';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { addWeightOnPrimaryDecision, PURCHASE_MODE } from './ordering.helpers';
import { getOptionsViewDataByPricingPlanIds, getPricingPlanIdsFromOfferingContextShoppingCart, getPricingPlanIdsFromSavedShoppingCart } from '../../components/shop/decision/decision.options.helper';
import { Client } from '../client.selectors';
import { OfferingContextShoppingCart } from '../orderFlow/offeringContext/offering.context.selectors';
import { ActiveOfferId, ActiveOfferInstanceId } from '../orderFlow/order.flow.selectors';
import { Offerings } from '../plansServices/plans.services.selectors';
import { SubscriberRelatedInformationIsLoading } from '../subscriberOfferings/subscriber.offerings.selectors';

const EMPTY_OBJECT = {};
const Base = createSelector(
  Client,
  (client) => {
    return pathOr(null, ['ordering'], client);
  }
);

export const Ordering = createSelector(
  Base,
  (base) => {
    return pathOr(null, ['data'], base);
  }
);

export const OfferingContextsByInstanceId = createSelector([
  Ordering
], (ordering) => {
  return pathOr(EMPTY_OBJECT, ['dataByInstanceId'], ordering);
});

export const OfferingInstanceId = (state, id) => id;

export const OfferingContextForDecisions = createSelector(
  OfferingContextsByInstanceId,
  OfferingInstanceId,
  (byId, id) => pathOr(null, [id], byId)
);
export const IsCalculatingDecisionBeingModified = createSelector([
  Ordering
], (ordering) => {
  return pathOr(EMPTY_OBJECT, ['isCalculatingDecisionBeingModified'], ordering);
});

export const IsLoadingOfferingContextForDecision = createSelector(
  Ordering,
  (ordering) => {
    const statuses = Object.values(ordering.statusesByInstanceId);

    if (!statuses.length) {
      return false;
    }

    return statuses.some((status) => {
      return status === LOADING_STATUS.LOADING;
    });
  }
);

const getType = (id, externalIds) => {
  let offerType;
  Object.values(externalIds).forEach((value) => {
    const offerId = pathOr(null, ['offerId'], value);
    const type = pathOr(null, ['type'], value);
    if (offerId === id) {
      offerType = type;
    }
  });
  return offerType;
};

export const PrimaryDecisionsForEveryContext = createSelector([
  OfferingContextsByInstanceId,
  Offerings,
  SearchOffersOfferings,
  OfferingExternalReferenceData,
  SubscriberAvailableOffers,
  OfferingsMetadata
], (offeringContexts, subscriberOffers, searchOffers, externalIds, feasibilityOptions, offersMeta) => {
  const primaryDecisions = {};

  if (subscriberOffers.length && Object.values(offeringContexts).length && searchOffers.length) {
    subscriberOffers.forEach((offer) => {
      const useOfferingId = !(offeringContexts[offer.OfferingInstanceId]);
      const contextToUse = useOfferingId ? offeringContexts[offer.OfferingId] : offeringContexts[offer.OfferingInstanceId];
      const typeOfOffer = contextToUse ? getType(contextToUse.Context.OfferingIds[0], externalIds) : null;
      const feasibilityForMyOffer = feasibilityOptions.filter(({ offerid }) => offerid === offer.OfferingId);
      const primaryDecision = addWeightOnPrimaryDecision(contextToUse, offersMeta, PURCHASE_MODE.MODIFY, typeOfOffer, offer, feasibilityForMyOffer);
      if (primaryDecision) {
        primaryDecisions[offer.OfferingInstanceId] = primaryDecision;
      }

      return primaryDecisions;
    });
  }

  return primaryDecisions;
});

export const FilterOutPrimaryDecisionsForActiveContext = createSelector([
  PrimaryDecisionsForEveryContext,
  ActiveOfferInstanceId
], (primaryDecisions, instanceId) => {
  const primaryDecision = primaryDecisions[instanceId];

  return primaryDecision;
});


export const MarketingTemplatesWithPrimaryDecisions = createSelector([
  OfferingContextsByInstanceId,
  MarketingTemplatesBasedOnOffers,
  OfferingsMetadata
], (offerContexts, marketingTemplates, offersMetadata) => {
  const templatesWithDecisions = [];
  marketingTemplates.forEach((template) => {
    const offeringContextToUse = offerContexts[template.OfferId];
    const primaryDecision = addWeightOnPrimaryDecision(offeringContextToUse, offersMetadata, PURCHASE_MODE.NEW_PURCHASE);

    templatesWithDecisions.push(template.set('PrimaryDecisions', primaryDecision));
  });

  return templatesWithDecisions;
});

export const MarketingTemplatesWithOfferTypes = createSelector([
  MarketingTemplatesWithPrimaryDecisions,
  OfferingExternalReferenceData,
  OfferingsMetadata
], (Offers, externalIds, offersMeta) => {
  return Offers.map((offer) => {
    return ({
      ...offer,
      PricingPlanThumbnails: pathOr(EMPTY_OBJECT, ['offer', 'Id', 'PricingPlanThumbnails'], offersMeta),
      ProductThumbnails: pathOr(EMPTY_OBJECT, ['offer', 'Id', 'ProductThumbnails'], offersMeta),
      type: getType(offer.Id, externalIds),
      Options: offersMeta[offer.Id] ? offersMeta[offer.Id].Options : []
    });
  });
});

export const MobileMarketingTemplates = createSelector(
  MarketingTemplatesWithOfferTypes,
  (offers) => (offers.find((offer) => offer.type === AllExternalDisplayNames.MOBILE))
);

export const BenifyMarketingTemplates = createSelector(
  MarketingTemplatesWithOfferTypes,
  (offers) => (offers.find((offer) => offer.type === AllExternalDisplayNames.BENIFY))
);

export const PlayMarketingTemplates = createSelector(
  MarketingTemplatesWithOfferTypes,
  OfferingsMetadata,
  (offers, offersMeta) => {
    const offer = offers.find((item) => item.type === AllExternalDisplayNames.PLAY);

    if (offer) {
      offer.Options = offersMeta[offer.Id].Options;
      offer.PricingPlanThumbnails = offersMeta[offer.Id].PricingPlanThumbnails;
      offer.ProductThumbnails = offersMeta[offer.Id].ProductThumbnails;
    }

    return offer;
  }
);

export const MobileAndBroadbandAndBenifyMarketingTemplates = createSelector([
  MarketingTemplatesWithOfferTypes
], (Offers) => {
  return Offers.filter((offer) => {
    return offer.type === AllExternalDisplayNames.BROADBAND ||
            offer.type === AllExternalDisplayNames.MOBILE ||
            offer.type === AllExternalDisplayNames.BENIFY ||
            offer.type === AllExternalDisplayNames.STUDENT_MOBILE ||
            offer.type === AllExternalDisplayNames.STUDENT_BROADBAND ||
            offer.type === AllExternalDisplayNames.CAMPAIGN_BROADBAND ||
            offer.type === AllExternalDisplayNames.CAMPAIGN_MOBILE;
  });
});

export const AllowanceMarketingTemplate = createSelector([
  MarketingTemplatesWithOfferTypes,
  OfferingsMetadata
], (Offers, offersMeta) => {
  const offer = Offers.find((template) => {
    return template.type === AllExternalDisplayNames.ALLOWANCE;
  });

  if (offer) {
    offer.Options = offersMeta[offer.Id].Options;
    offer.PricingPlanThumbnails = offersMeta[offer.Id].PricingPlanThumbnails;
  }

  return offer;
});

export const DecisionBeingModified = createSelector([
  Ordering
], (ordering) => {
  return pathOr(EMPTY_OBJECT, ['decisionBeingModified'], ordering);
});

export const IsolatedRetrieval = createSelector([
  Ordering
], (ordering) => {
  return pathOr(false, ['isolatedRetrieval'], ordering);
});

export const CurrentOfferIsMobile = createSelector(
  ActiveOfferId,
  OfferingExternalReferenceData,
  (activeOfferId, externalIds) => {
    const studentMobileOfferId = path([AllExternalDisplayNames.STUDENT_MOBILE, 'offerId'], externalIds);
    const campaignOfferId = path([AllExternalDisplayNames.CAMPAIGN_MOBILE, 'offerId'], externalIds);
    const mobileOfferId = path([AllExternalDisplayNames.MOBILE, 'offerId'], externalIds);
    const benifyOfferId = path([AllExternalDisplayNames.BENIFY, 'offerId'], externalIds);

    return campaignOfferId === activeOfferId || mobileOfferId === activeOfferId || studentMobileOfferId === activeOfferId || benifyOfferId === activeOfferId;
  }
);

export const CurrentOfferIsBroadband = createSelector(
  ActiveOfferId,
  OfferingExternalReferenceData,
  (activeOfferId, externalIds) => {
    const studentBroadbandOfferId = path([AllExternalDisplayNames.STUDENT_BROADBAND, 'offerId'], externalIds);
    const broadbandOfferId = path([AllExternalDisplayNames.BROADBAND, 'offerId'], externalIds);
    const campaignOfferId = path([AllExternalDisplayNames.CAMPAIGN_BROADBAND, 'offerId'], externalIds);

    return campaignOfferId === activeOfferId || studentBroadbandOfferId === activeOfferId || broadbandOfferId === activeOfferId;
  }
);

export const CurrentOfferIsMobileAndBenify = createSelector(
  ActiveOfferId,
  OfferingExternalReferenceData,
  (activeOfferId, externalIds) => {
    const benifyOfferId = path([AllExternalDisplayNames.BENIFY, 'offerId'], externalIds);

    return benifyOfferId === activeOfferId;
  }
);

export const UpdatedQuotesForDecision = createSelector([
  DecisionBeingModified,
  QuoteData,
  DefaultPaymentInstrument
], (decisionBeingModified, quoteData, paymentInstrument) => {
  const items = pathOr([], ['Items'], quoteData);
  const name = pathOr('', ['Name'], paymentInstrument);
  const baseInfo = {
    Name: decisionBeingModified.name,
    OfferName: decisionBeingModified.offerName,
    PaymentMethod: name
  };

  switch (decisionBeingModified.action) {
  case OfferingContextIntent.ADD: {
    const decision = items.find((item) => {
      return item.PricingPlan.Name === decisionBeingModified.name;
    });

    return {
      ...baseInfo,
      Total: pathOr(null, ['OrderQuoteTotals', 0, 'TotalAmount'], quoteData),
      Currency: pathOr(FallbackCurrencyLocale, ['PricingPlan', 'Currency'], decision)
    };
  }
  case OfferingContextIntent.REMOVE: {
    const decision = items.find((item) => {
      return item.PricingPlan.Name === decisionBeingModified.offerName;
    });

    return {
      ...baseInfo,
      Total: pathOr(0, ['OrderQuoteTotals', 0, 'TotalAmount'], quoteData),
      Currency: pathOr(FallbackCurrencyLocale, ['PricingPlan', 'Currency'], decision)
    };
  }
  default:
    break;
  }

  return null;
});

export const SubscriberInformationAndROCIsLoading = createSelector([
  SubscriberRelatedInformationIsLoading,
  IsOfferingContextStatusLoading,
  IsolatedRetrieval
], (subscriberInfoLoading, ROCLoading, isolatedRetrieval) => {
  return subscriberInfoLoading || (ROCLoading && !isolatedRetrieval);
});

export const IsInBundleOrderFlow = createSelector([
  Ordering
], (ordering) => {
  return path(['isInBundleOrderFlow'], ordering);
});

export const OptionsViewDataInShoppingCart = createSelector(
  MobileAndBroadbandAndBenifyMarketingTemplates,
  OfferingContextShoppingCart,
  SavedShoppingCart,
  IsInBundleOrderFlow,
  OfferingsMetadata,
  (marketingTemplates, offeringContextShoppingCart, savedShoppingCart, isInBundleOrderFlow, offeringsMeta) => {
    if (!marketingTemplates || !marketingTemplates.length > 0) {
      // log('MARKETING TEMPLATES ARE EMPTY');
      return [];
    }

    if (offeringContextShoppingCart && offeringContextShoppingCart.Offerings && offeringContextShoppingCart.Offerings.length > 0) {
      const marketingTemplateToUse = marketingTemplates.find((template) => {
        return template.Id === offeringContextShoppingCart.Offerings[0].OfferingId;
      });
      if (marketingTemplateToUse === null) {
        return [];
      }
      // log('OFFERING CONTEXT SC:', offeringContextShoppingCart);
      const pricingPlanIds = getPricingPlanIdsFromOfferingContextShoppingCart(offeringContextShoppingCart);
      const optionsViewData = getOptionsViewDataByPricingPlanIds(marketingTemplateToUse, true, pricingPlanIds, isInBundleOrderFlow, offeringsMeta);
      return optionsViewData;
    }

    // TODO marketingTemplateToUse is undefined when we have more than on offeringID in the cart.
    if (!isInBundleOrderFlow && savedShoppingCart && savedShoppingCart.Items && savedShoppingCart.Items.length > 0) {
      const marketingTemplateToUse = marketingTemplates.find((template) => {
        return template.Id === savedShoppingCart.Items[0].OfferingId;
      });
      // log('OFFERING CONTEXT IS EMPTY');
      // log('SAVED SHOPPING CART', savedShoppingCart);
      const pricingPlanIds = getPricingPlanIdsFromSavedShoppingCart(savedShoppingCart);
      const optionsViewData = getOptionsViewDataByPricingPlanIds(marketingTemplateToUse, true, pricingPlanIds, isInBundleOrderFlow, offeringsMeta);
      return optionsViewData;
    }

    // Loop through the shopping cart Items... for each unique OfferingId call the getOptionsViewDataByPricingPlanIds then merge the results
    // TODO Fix this. Don't hard code this to '5' later. For now if the shopping cart length is greater than that number that works. In the futre this could break.
    if (isInBundleOrderFlow && savedShoppingCart && savedShoppingCart.Items && savedShoppingCart.Items.length > 5) {
      const optionsViewDataList = marketingTemplates.map((marketingTemplateToUse) => {
        // log('OFFERING CONTEXT IS EMPTY');
        // log('SAVED SHOPPING CART', savedShoppingCart);
        const pricingPlanIds = getPricingPlanIdsFromSavedShoppingCart(savedShoppingCart);
        const viewOptionsData = getOptionsViewDataByPricingPlanIds(marketingTemplateToUse, true, pricingPlanIds, isInBundleOrderFlow, offeringsMeta);
        return viewOptionsData;
      });
      // eslint-disable-next-line prefer-spread
      const mergedOptionsViewData = [].concat.apply([], optionsViewDataList);
      return mergedOptionsViewData;
    }


    // log('SAVED SHOPPING CART IS EMPTY');
    return [];
  }
);

// TODO this could probably be removed for usin gthe inverse of 'isProspect' (ProspectIsAvailable)
export const IsExistingUser = createSelector([
  Ordering
], (ordering) => {
  return path(['isExistingUser'], ordering);
});
