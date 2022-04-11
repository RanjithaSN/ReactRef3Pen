import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberAvailableOffers } from '../feasibility/feasibility.selectors';
import { CODES } from '../metadata/codes/codes.constants';
import { CodeItems } from '../metadata/codes/codes.selectors';
import { SelectedLocale } from '../preferences/preferences.selectors';
import { OFFER_TYPES } from '../searchOffers/search.offers.constants';
import { SearchOffersOfferings } from '../searchOffers/search.offers.selectors';
import { SelectedOfferType } from '../settings/settings.selectors';
import { MultipleSubscription } from '../subscriberOfferings/subscriber.offerings.selectors';
import { MARKETING_TEMPLATES, MARKETING_TEMPLATES_GROUPINGS } from './marketing.templates.constants';

const EMPTY_ARRAY = [];

export const MarketingTemplatesWithMappedAttributes = createSelector([
  CodeItems(CODES.MarketingTemplateType),
  CodeItems(CODES.MarketingTemplateTypeAttribute)
], (types, attributes) => {
  if (types.length && attributes.length) {
    const mutableTypes = types.asMutable({
      deep: true
    });
    mutableTypes.forEach((type) => {
      const ids = type.AdditionalProperties.AttributeIds;
      const fieldIds = ids.split(',');

      const filteredAttributes = attributes.filter((attribute) => {
        return fieldIds.includes(attribute.Value);
      });
      type.labels = filteredAttributes.map((attribute) => ({ // eslint-disable-line no-param-reassign
        label: attribute.Name,
        id: attribute.Value
      }));
    });
    return new Immutable(mutableTypes);
  }
  return EMPTY_ARRAY;
});

function isMarketingTemplateAvailable(offer, marketingTemplate, selectedOfferType) {
  const hasMarketingTemplate = marketingTemplate && Object.values(MARKETING_TEMPLATES).some((value) => {
    return value === marketingTemplate.Name;
  });

  if (!marketingTemplate || !hasMarketingTemplate) {
    return false;
  }

  if (selectedOfferType === OFFER_TYPES.STANDARD) {
    return marketingTemplate.Name !== MARKETING_TEMPLATES.DEVICE;
  }

  const hasDeviceTemplate = MARKETING_TEMPLATES_GROUPINGS.DEVICE.some((value) => {
    return marketingTemplate.Name === value;
  });
  return offer.OfferType !== OFFER_TYPES.STANDARD && hasDeviceTemplate;
}

function formatMarketingView(offer, marketingTemplate, subscriptions, locale, index, selectedOfferType) {
  const isTemplateAvailable = isMarketingTemplateAvailable(offer, marketingTemplate, selectedOfferType);

  if (isTemplateAvailable) {
    const marketingView = {
      ...offer,
      Id: offer.Id,
      Status: null,
      CycleType: null,
      CycleDate: null,
      Weight: offer.Weight,
      OfferName: offer.Name,
      OfferId: offer.Id,
      OfferDescription: offer.ShortDescription,
      Qualification: offer.Qualification,
      AddOns: [],
      templateName: marketingTemplate.Name,
      Currency: offer.CurrencyCode,
      PreferenceLocale: locale,
      PaymentInstrument: {}
    };

    const subscriptionToUse = subscriptions.find((subscription) => {
      return subscription.id === offer.Id;
    });

    if (subscriptionToUse) {
      marketingView.Status = subscriptionToUse.status;
      marketingView.IsLocked = subscriptionToUse.isLocked;
      marketingView.IsPaymentExpired = subscriptionToUse.isPaymentExpired;
      marketingView.RenewAmount = subscriptionToUse.renewAmount;
      marketingView.CycleType = subscriptionToUse.cycleType;
      marketingView.CycleDate = subscriptionToUse.cycleDate;
      marketingView.OfferingInstanceId = subscriptionToUse.offeringInstanceId;
      marketingView.AddOns = subscriptionToUse.addOns;
      marketingView.PaymentInstrument = subscriptionToUse.paymentInstrument;
    }

    const details = offer.MarketingViews[index].AttributeValues;
    details.forEach((detail) => {
      const field = marketingTemplate.labels.find((item) => {
        return item.id === detail.AttributeId;
      });
      if (field) {
        marketingView[field.label] = detail.Value;
      }
    });

    return Immutable(marketingView);
  }
  return offer
    .set('templateName', MARKETING_TEMPLATES.GENERIC)
    .set('PreferenceLocale', locale);
}

export const MarketingTemplatesBasedOnOffers = createSelector([
  SearchOffersOfferings,
  MarketingTemplatesWithMappedAttributes,
  MultipleSubscription,
  SelectedLocale,
  SelectedOfferType,
  SubscriberAvailableOffers
], (offers, marketingTemplates, subscriptions, locale, selectedOfferType, feasibilityOffers) => {
  if (offers.length) {
    const formattedMarketingTemplates = [];

    offers.forEach((offer) => {
      const fo = feasibilityOffers.filter(({ offerid }) => offerid === offer.Id);
      if (offer.MarketingViews && offer.MarketingViews.length && marketingTemplates.length) {
        offer.MarketingViews.forEach((templateConfiguration, index) => {
          const marketingTemplate = marketingTemplates.find((template) => {
            return template.Value === templateConfiguration.MarketingTemplateTypeCode;
          });
          formattedMarketingTemplates.push(formatMarketingView(offer.set('PreferenceLocale', locale)
            .set('FeasibilityOffers', fo.length ? fo : null), marketingTemplate, subscriptions, locale, index, selectedOfferType));
        });
      } else {
        formattedMarketingTemplates.push(offer
          .set('templateName', MARKETING_TEMPLATES.GENERIC)
          .set('PreferenceLocale', locale)
          .set('FeasibilityOffers', fo.length ? fo : null));
      }
    });
    return formattedMarketingTemplates;
  }
  return EMPTY_ARRAY;
});
