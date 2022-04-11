import { AllExternalDisplayNames, ShopExternalDisplayNames } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './ordering.reducer';
import * as Ordering from './ordering.selectors';

const initializedStore = new Immutable({
  client: {
    ordering: INITIAL_STATE
  }
});

const externalRefOffers = [
  {
    Id: 123
  },
  {
    Id: 321
  },
  {
    Id: 111
  },
  {
    Id: 444
  },
  {
    Id: 999
  }
];

const expectedExternalRefOffers = [
  {
    Id: 123,
    type: 'TeleMobil',
    Options: [],
    PricingPlanThumbnails: {},
    ProductThumbnails: {}
  },
  {
    Id: 321,
    type: 'Broadband1',
    Options: [],
    PricingPlanThumbnails: {},
    ProductThumbnails: {}
  },
  {
    Id: 111,
    type: undefined,
    Options: [],
    PricingPlanThumbnails: {},
    ProductThumbnails: {}
  }, {
    Id: 444,
    type: 'Allowance',
    Options: [],
    PricingPlanThumbnails: {},
    ProductThumbnails: {}
  },
  {
    Id: 999,
    type: AllExternalDisplayNames.PLAY,
    Options: [],
    PricingPlanThumbnails: {},
    ProductThumbnails: {}
  }
];

const externalIds = {
  TeleMobil: {
    offerId: 123,
    type: 'TeleMobil'
  },
  Broadband1: {
    offerId: 321,
    type: 'Broadband1'
  },
  Allowance: {
    offerId: 444,
    type: 'Allowance'
  },
  [AllExternalDisplayNames.PLAY]: {
    offerId: 999,
    type: AllExternalDisplayNames.PLAY
  }
};

const offersMeta = {};

describe('Ordering ', () => {
  xdescribe('When MarketingTemplatesWithOfferTypes is used...', () => {
    test('It should return an empty array with no offers', () => {
      expect(Ordering.MarketingTemplatesWithOfferTypes.resultFunc([])).toEqual([]);
    });
    test('It should return an array of offers with the correct type added', () => {
      expect(Ordering.MarketingTemplatesWithOfferTypes.resultFunc(externalRefOffers, externalIds, offersMeta)).toEqual(expectedExternalRefOffers);
    });
  });
  describe('When MobileMarketingTemplates', () => {
    const mobileOffers = expectedExternalRefOffers.find((offer) => {
      return offer.type === 'TeleMobil';
    });
    test('It should return nothing with no offers', () => {
      expect(Ordering.MobileMarketingTemplates.resultFunc([])).toEqual(undefined);
    });
    test('It should return nothing if no offers have types mobile', () => {
      expect(Ordering.MobileMarketingTemplates.resultFunc([expectedExternalRefOffers[2]])).toEqual(undefined);
    });
    test('It should return an array of offers that have types that are of mobile', () => {
      expect(Ordering.MobileMarketingTemplates.resultFunc(expectedExternalRefOffers)).toEqual(mobileOffers);
    });
  });
  xdescribe('When PlayMarketingTemplates', () => {
    const playOffer = expectedExternalRefOffers.find(({ type }) => type === AllExternalDisplayNames.PLAY);
    test('It should return nothing with no offers', () => {
      expect(Ordering.PlayMarketingTemplates.resultFunc([])).toEqual(undefined);
    });
    test('It should return nothing if no offers have type play', () => {
      expect(Ordering.PlayMarketingTemplates.resultFunc([expectedExternalRefOffers[2]])).toEqual(undefined);
    });
    test('It should return the offer that has type of play', () => {
      expect(Ordering.PlayMarketingTemplates.resultFunc(expectedExternalRefOffers)).toEqual(playOffer);
    });
  });

  describe('When AllowanceMarketingTemplate', () => {
    test('It should return an undefined with no offers', () => {
      expect(Ordering.AllowanceMarketingTemplate.resultFunc([])).toBe(undefined);
    });
    test('It should return an undefined if no offers have type alloweance', () => {
      expect(Ordering.AllowanceMarketingTemplate.resultFunc([expectedExternalRefOffers[1]])).toBe(undefined);
    });
  });
  describe('When CurrentOfferIsMobile', () => {
    const ORDER_ID = 99999;

    test('It should return false if no external refs defined.', () => {
      expect(Ordering.CurrentOfferIsMobile.resultFunc(ORDER_ID, {})).toEqual(false);
    });
    test('It should return false if no current order id.', () => {
      expect(Ordering.CurrentOfferIsMobile.resultFunc(null, {
        [ShopExternalDisplayNames.MOBILE]: {
          type: ShopExternalDisplayNames.MOBILE,
          offerId: ORDER_ID
        }
      })).toEqual(false);
    });
    test('It should return false if current order id is not mobile.', () => {
      expect(Ordering.CurrentOfferIsMobile.resultFunc(ORDER_ID, {
        [ShopExternalDisplayNames.MOBILE]: {
          type: ShopExternalDisplayNames.MOBILE,
          offerId: 88888
        }
      })).toEqual(false);
    });
    test('It should return true if current order id is mobile.', () => {
      expect(Ordering.CurrentOfferIsMobile.resultFunc(ORDER_ID, {
        [ShopExternalDisplayNames.MOBILE]: {
          type: ShopExternalDisplayNames.MOBILE,
          offerId: ORDER_ID
        }
      })).toEqual(true);
    });
  });

  xdescribe('Offering Context For Decisions', () => {
    const OFFERING_CONTEXT = {
      132: {
        Id: 222
      }
    };
    const withOfferingContext = initializedStore.setIn(['client', 'ordering', 'data', 'dataByInstanceId'], OFFERING_CONTEXT);

    test('returns the offering context object when it exists', () => {
      expect(Ordering.OfferingContextsByInstanceId(withOfferingContext)).toEqual(OFFERING_CONTEXT);
    });

    test('returns an empty object when the offering context does not exists', () => {
      const offeringContextAsNull = initializedStore.setIn(['client', 'ordering', 'data', 'dataByInstanceId'], null);
      expect(Ordering.OfferingContextsByInstanceId(offeringContextAsNull)).toEqual({});
    });
  });

  describe('Decision being modified', () => {
    const DECISION = {
      Id: 123,
      Name: 'Cinemax'
    };
    const withDecision = initializedStore.setIn(['client', 'ordering', 'data', 'decisionBeingModified'], DECISION);

    test('returns the decision when it exists', () => {
      expect(Ordering.DecisionBeingModified(withDecision)).toEqual(DECISION);
    });

    test('returns an empty object when the decision does not exists', () => {
      const decisionAsNull = initializedStore.setIn(['client', 'ordering', 'data', 'decisionBeingModified'], null);
      expect(Ordering.DecisionBeingModified(decisionAsNull)).toEqual({});
    });
  });

  describe('Isolated Retrieval', () => {
    test('returns false when it the value is undefined', () => {
      const isolatedRetrieval = initializedStore.setIn(['client', 'ordering', 'data', 'isolatedRetrieval'], undefined);
      expect(Ordering.IsolatedRetrieval(isolatedRetrieval)).toBe(false);
    });

    test('returns true when it is set to true', () => {
      const isolatedRetrieval = initializedStore.setIn(['client', 'ordering', 'data', 'isolatedRetrieval'], true);
      expect(Ordering.IsolatedRetrieval(isolatedRetrieval)).toBe(true);
    });
  });

  describe('SubscriberInformationAndROCIsLoading', () => {
    test('returns true when subscriber info is loading it is not an isolated retrieval and roc is loading', () => {
      expect(Ordering.SubscriberInformationAndROCIsLoading.resultFunc(true, true, false)).toBe(true);
    });

    test('returns false when subscriber info is loading it is an isolated retrieval and roc is loading', () => {
      expect(Ordering.SubscriberInformationAndROCIsLoading.resultFunc(true, true, true)).toBe(true);
    });

    test('returns false when subscriber info is loading it is not an isolated retrieval and roc is not loading', () => {
      expect(Ordering.SubscriberInformationAndROCIsLoading.resultFunc(true, false, false)).toBe(true);
    });
  });

  describe('UpdatedQuotesForDecision', () => {
    const QUOTE_DATA = {
      Items: [{
        PricingPlan: {
          Name: 'decision quote',
          ChargeAmount: '2.00',
          Currency: 'USD'
        }
      }],
      OrderQuoteTotals: [{
        TotalAmount: '122.22'
      }]
    };

    const PAYMENT_INSTRUMENT = {
      Name: 'Visa ending in 1111'
    };

    test('returns the formatted object when the decision being modified matches quote data for the add action', () => {
      const DECISION_BEING_MODIFIED = {
        name: 'decision quote',
        offerName: 'Associated Offer',
        action: 1
      };

      expect(Ordering.UpdatedQuotesForDecision.resultFunc(DECISION_BEING_MODIFIED, QUOTE_DATA, PAYMENT_INSTRUMENT)).toEqual({
        Currency: QUOTE_DATA.Items[0].PricingPlan.Currency,
        Name: QUOTE_DATA.Items[0].PricingPlan.Name,
        Total: QUOTE_DATA.OrderQuoteTotals[0].TotalAmount,
        OfferName: DECISION_BEING_MODIFIED.offerName,
        PaymentMethod: PAYMENT_INSTRUMENT.Name
      });
    });

    test('returns the formatted object when the decision being modified matches quote data for the remove action', () => {
      const DECISION_BEING_MODIFIED = {
        name: 'non matching name',
        offerName: 'decision quote',
        action: 4
      };

      expect(Ordering.UpdatedQuotesForDecision.resultFunc(DECISION_BEING_MODIFIED, QUOTE_DATA, PAYMENT_INSTRUMENT)).toEqual({
        Currency: QUOTE_DATA.Items[0].PricingPlan.Currency,
        Name: DECISION_BEING_MODIFIED.name,
        Total: QUOTE_DATA.OrderQuoteTotals[0].TotalAmount,
        OfferName: DECISION_BEING_MODIFIED.offerName,
        PaymentMethod: PAYMENT_INSTRUMENT.Name
      });
    });

    test('returns null when there is not an items array within quote data', () => {
      expect(Ordering.UpdatedQuotesForDecision.resultFunc({}, [])).toBe(null);
    });
  });

  describe('Primary Decisions for every context', () => {
    const ACTIVE_OFFERING_CONTEXTS = Immutable({
      1: {
        Context: {
          OfferingIds: [123],
          Decisions: [{
            Id: '2_2',
            PageId: '123',
            Options: [{
              Id: '3',
              PricingPlanBillerRuleInstances: {
                PricingPlanId: 222
              },
              Weight: 2
            }, {
              Id: '2',
              PricingPlanBillerRuleInstances: {
                PricingPlanId: 444
              },
              Weight: 40
            }, {
              Id: '1',
              PricingPlanBillerRuleInstances: {
                PricingPlanId: 333
              },
              Weight: 70
            }]
          }],
          Pages: [{
            Id: '123',
            Name: 'Primary Package'
          }]
        }
      }
    });

    const subscriberOfferings = [{
      OfferingInstanceId: 1,
      Options: [{
        OfferingOptionPriceId: '2',
        Status: 1
      }]
    }];

    const searchOfferings = [{
      Id: 123,
      Options: [{
        Id: '2',
        OptionPrices: [{
          PricingPlanId: 444,
          Weight: 40
        }, {
          PricingPlanId: 333,
          Weight: 70
        }, {
          PricingPlanId: 222,
          Weight: 2
        }]
      }]
    }];

    test('returns an empty object if any of the input selectors are not present', () => {
      expect(Ordering.PrimaryDecisionsForEveryContext.resultFunc({}, subscriberOfferings, searchOfferings, [])).toEqual({});
      expect(Ordering.PrimaryDecisionsForEveryContext.resultFunc(ACTIVE_OFFERING_CONTEXTS, [], searchOfferings, [])).toEqual({});
      expect(Ordering.PrimaryDecisionsForEveryContext.resultFunc(ACTIVE_OFFERING_CONTEXTS, subscriberOfferings, [], [])).toEqual({});
    });
  });
});
