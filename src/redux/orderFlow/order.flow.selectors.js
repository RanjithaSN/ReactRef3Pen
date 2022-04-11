import { OfferingContext, OfferingContextsByInstanceId } from '@selfcare/core/redux/offeringContext/offering.context.selectors';
import { DefaultPaymentInstrument, PaymentInstruments } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import pathOr from 'ramda/src/pathOr';
import propEq from 'ramda/src/propEq';
import split from 'ramda/src/split';
import values from 'ramda/src/values';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { DECISION_TYPE } from '../../constants/order.constants';
import { Client } from '../client.selectors';
import { FormattedSubscriberOfferings } from '../subscriberOfferings/subscriber.offerings.selectors';

const EMPTY_OBJECT = {};

export const BaseOrdering = createSelector(
  Client,
  (client) => pathOr(null, ['orderFlow'], client)
);

export const ActiveOfferId = createSelector(
  BaseOrdering,
  (ordering) => pathOr(null, ['activeOfferId'], ordering)
);

export const ActiveOfferInstanceId = createSelector(
  BaseOrdering,
  (ordering) => pathOr(null, ['activeOfferInstanceId'], ordering)
);

export const OfferStateByInstanceId = createSelector(
  BaseOrdering,
  (ordering) => pathOr(EMPTY_OBJECT, ['offerStateByInstanceId'], ordering)
);

export const DecisionsById = createSelector(
  BaseOrdering,
  (ordering) => ordering.decisionsById
);

export const SelectedPaymentInstrumentId = createSelector(
  BaseOrdering,
  (ordering) => ordering.selectedPaymentInstrumentId
);

export const ProductIdentifier = createSelector(
  ActiveOfferInstanceId,
  OfferingContextsByInstanceId,
  (activeOfferInstanceId, offeringContextsByInstanceId) => {
    const activeOffer = pathOr(null, [activeOfferInstanceId], offeringContextsByInstanceId);
    const Items = pathOr([], ['ShoppingCart', 'Items'], activeOffer);
    const productIdentifierItem = Items.find(({ Details }) => {
      const externalReferences = pathOr(false, ['Product', 'ExternalReferences'], Details);
      if (externalReferences) {
        const productIdentifier = externalReferences.find(({ ExternalId }) => ExternalId === 'PRODUCT_IDENTIFIER');
        if (productIdentifier) {
          return true;
        }
      }
      return false;
    });
    return pathOr(null, ['ProductId'], productIdentifierItem);
  }
);

export const SubscriberHasCurrentOffer = createSelector(
  ActiveOfferInstanceId,
  FormattedSubscriberOfferings,
  (instanceId, offers) => offers.some(({ OfferingInstanceId }) => (
    OfferingInstanceId === instanceId
  ))
);

const getFilteredBulkDetailsForBriId = (briId, bulkDetails = []) => {
  const bulkDetailsForBriId = bulkDetails.filter(propEq('BillerRuleConfigurationId', briId));
  return bulkDetailsForBriId.length ? bulkDetailsForBriId : [Immutable({
    Amount: null,
    EndDate: null,
    Quantity: null,
    StartDate: null
  })];
};

const createCompletedBulkDetails = (option) => {
  if (option.Bulk) {
    return option.BillerRuleInstanceAmounts.map((bri) => {
      let bulkDecisionDetails = getFilteredBulkDetailsForBriId(bri.BillerRuleConfigurationId, option.BulkDetails).map((detail) => {
        return detail.set('Quantity', option.Quantity);
      });
      if (bri.pricingPeriods) {
        bulkDecisionDetails = bri.pricingPeriods.map((period) => {
          return period.set('Quantity', option.Quantity);
        });
      }

      return {
        BillerRuleConfigurationId: bri.BillerRuleConfigurationId,
        BulkDecisionDetails: bulkDecisionDetails
      };
    });
  }
};

const createCompletedQuantityDecisions = (decision) => (
  decision.Options.map((option) => ({
    DecisionType: decision.DecisionType,
    Id: split('_', decision.Id)[1],
    IsPlanOrServiceSwap: option.Bulk && option.IsPlanOrServiceSwap,
    Quantity: option.Bulk && option.Quantity > 0 ? 1 : option.Quantity || 0,
    BulkBillerRuleInstanceDetails: createCompletedBulkDetails(option),
    SelectedValue: option.Id
  }))
);

const createSingleCompletedGroupDecision = (decision, option) => ({
  DecisionType: decision.DecisionType,
  Id: split('_', decision.Id)[1],
  ItemDecisions: option.Items.map(({ DecisionGroupOptionItemId, Quantity }) => ({
    DecisionGroupOptionItemId,
    Quantity
  })),
  Quantity: option.Quantity || 0,
  SelectedValue: option.Id
});

const createCompletedDecisionsForPickManyGroup = (decision) => (
  decision.Options.map((option) => createSingleCompletedGroupDecision(decision, option))
);

const createCompletedDecisionsForPickOneGroup = (decision) => {
  const selectedOption = decision.Options.find((option) => option.Selected);

  return selectedOption ? [createSingleCompletedGroupDecision(decision, selectedOption)] : [];
};

export const createCompletedDecisions = (decisions) => {
  const result = [];

  decisions.forEach((decision) => {
    switch (decision.DecisionType) {
    case DECISION_TYPE.QUANTITY: {
      result.push(...createCompletedQuantityDecisions(decision));
      break;
    }
    case DECISION_TYPE.DECISION_GROUP: {
      if (decision.MaximumQuantity === 1) {
        result.push(...createCompletedDecisionsForPickOneGroup(decision));
      } else {
        result.push(...createCompletedDecisionsForPickManyGroup(decision));
      }
      break;
    }
    default:
      break;
    }
  });

  result.sort((a, b) => {
    if (a.DecisionType === b.DecisionType) {
      return 0;
    }
    if (a.DecisionType < b.DecisionType) {
      return -1;
    }
    return 1;
  });

  return result;
};

export const CompletedDecisions = createSelector(
  DecisionsById,
  (decisionsById) => (
    Immutable(createCompletedDecisions(values(decisionsById)))
  )
);

export const SelectedPaymentInstrument = createSelector(
  SelectedPaymentInstrumentId,
  PaymentInstruments,
  DefaultPaymentInstrument,
  (id, instrumentsById, defaultInstrument) => {
    const result = pathOr(null, [id], instrumentsById);

    if (!result && defaultInstrument) {
      return defaultInstrument;
    }

    return result;
  }
);

export const ActiveOfferContext = createSelector(
  (state) => OfferingContext(state, ActiveOfferInstanceId(state)),
  (context) => context
);

export const SavedCompletedDecisionsForActiveOffer = createSelector(
  BaseOrdering,
  ActiveOfferInstanceId,
  (ordering, activeInstanceId) => pathOr(null, ['savedCompletedDecisions', activeInstanceId], ordering)
);
