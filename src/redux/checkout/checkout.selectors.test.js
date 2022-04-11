import { RECURRING_PERIOD_CODES } from '@selfcare/core/constants/biller.rule.instance';
import { AllExternalDisplayNames, ShopExternalDisplayNames } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import LocaleKeys from '../../locales/keys';
import * as Checkout from './checkout.selectors';


describe('Checkout ', () => {
  describe('When ListOfQuoteItemsWithAmounts is used...', () => {
    const externalOfferIds = {
      [AllExternalDisplayNames.PLAY]: {
        offerId: 'bob'
      },
      [AllExternalDisplayNames.MOBILE]: {
        offerId: 'mobile'
      }
    };
    test('It should return an empty array with the amounts are not greater than zero', () => {
      const items = [{
        Amount: 0,
        OfferingId: 'test'
      }];

      expect(Checkout.ListOfQuoteItemsWithAmounts.resultFunc(items, externalOfferIds)).toEqual([]);
    });
    test('It should return an array filtered to the items with an amount greater than zero', () => {
      const items = [{
        Amount: 0,
        OfferingId: 'test'
      }, {
        Amount: 3,
        OfferingId: 'mobile'
      }];
      expect(Checkout.ListOfQuoteItemsWithAmounts.resultFunc(items, externalOfferIds)).toEqual([items[1]]);
    });
    test('It should return an array filtered to the items with an amount greater than zero and the play ID', () => {
      const items = [{
        Amount: 0,
        OfferingId: 'bob'
      }, {
        Amount: 3,
        OfferingId: 'mobile'
      }];
      expect(Checkout.ListOfQuoteItemsWithAmounts.resultFunc(items, externalOfferIds)).toEqual(items);
    });
  });
  describe('When QuoteHasPlay is used...', () => {
    const externalOfferIds = {
      [AllExternalDisplayNames.PLAY]: {
        offerId: 'bob'
      },
      [AllExternalDisplayNames.MOBILE]: {
        offerId: 'mobile'
      }
    };
    test('It should return true if the items contains a play', () => {
      const items = [{
        BillerRuleQuoteItems: [{
          SubTotalAmount: 30,
          TotalAmount: 10
        }],
        PricingPlan: {
          PricingPlanName: 'Name'
        },
        Amount: 30,
        OfferingId: 'bb'
      }, {
        BillerRuleQuoteItems: [{
          SubTotalAmount: 30,
          TotalAmount: 10
        }],
        PricingPlan: {
          PricingPlanName: 'Name'
        },
        Amount: 0,
        OfferingId: 'bob'
      }];
      expect(Checkout.QuoteHasPlay.resultFunc(items, externalOfferIds)).toEqual(true);
    });
    test('It should return false if no play items in the quote', () => {
      expect(Checkout.QuoteHasPlay.resultFunc([], externalOfferIds)).toEqual(false);
    });
  });

  describe('When DisplayListOfQuoteItems is used...', () => {
    test('It should return an array of key value pairs with the currency formatted ', () => {
      const items = [{
        BillerRuleQuoteItems: [{
          SubTotalAmount: 30,
          TotalAmount: 10
        }],
        PricingPlan: {
          PricingPlanName: 'Name'
        },
        Amount: 30
      }];
      const quote = {
        Currency: 'SEK'
      };
      expect(Checkout.DisplayListOfQuoteItems.resultFunc(items, quote, 'en-US')).toEqual([{
        label: 'Name',
        value: 'SEK 10',
        originalValue: 'SEK 30'
      }]);
    });
    test('It should return an empty array when no items exist', () => {
      expect(Checkout.DisplayListOfQuoteItems.resultFunc([], 'SEK', 'en-US')).toEqual([]);
    });
  });

  describe('When OneTimeAndRecurringQuoteTotals is used...', () => {
    test('It should return zero for one time and recurring when quote totals do not exist', () => {
      const quote = {
        Currency: 'SEK',
        OrderQuoteTotals: []
      };
      expect(Checkout.OneTimeAndRecurringQuoteTotals.resultFunc(quote, 'en-US')).toEqual({
        oneTimeTotal: 'SEK 0',
        recurringTotal: 'SEK 0'
      });
    });
    test('It should return the rolled up one time and recurring quotes cost when they exist', () => {
      const quoteData = {
        Currency: 'SEK',

        BillerRuleQuoteItems: [{
          BillerRuleInstanceType: 2,
          TotalAmount: 40
        }, {
          BillerRuleInstanceType: 0,
          TotalAmount: 30
        }, {
          BillerRuleInstanceType: 0,
          TotalAmount: 1
        }, {
          BillerRuleInstanceType: 2,
          TotalAmount: 1
        }]
      };
      const result = Checkout.OneTimeAndRecurringQuoteTotals.resultFunc(quoteData, 'SEK', 'en-US');
      expect(result.oneTimeTotal).toMatch(/41/);
      expect(result.recurringTotal).toMatch(/31/);
    });
  });

  xdescribe('When SubmitOrderProductList is used...', () => {
    test('It should return an empty array when order does not exist', () => {
      expect(Checkout.SubmitOrderProductList.resultFunc({}, {})).toEqual([]);
      expect(Checkout.SubmitOrderProductList.resultFunc({}, {
        [ShopExternalDisplayNames.MOBILE]: {
          offerId: 123
        }
      })).toEqual([]);
    });
    test('It should return an empty array when order does not contain items with amounts over $0', () => {
      expect(Checkout.SubmitOrderProductList.resultFunc({
        Items: []
      }, {
        [ShopExternalDisplayNames.MOBILE]: {
          offerId: 123
        }
      })).toEqual([]);
      expect(Checkout.SubmitOrderProductList.resultFunc({
        Items: [{
          OfferingId: 123,
          OfferingInstanceId: 321,
          Name: 'No $',
          PricingPlan: {
            BillerRuleInstanceThumbnails: [{
              Amount: 0
            }, {
              Amount: 0
            }, {
              Amount: 0
            }]
          },
          RecurringPeriodTypeCode: RECURRING_PERIOD_CODES.NO_RECURRENCE
        }]
      }, {
        [ShopExternalDisplayNames.MOBILE]: {
          offerId: 123
        }
      })).toEqual([]);
    });
    test('It should return an array of products with amounts over $0', () => {
      const expectedLabel = 'Mobile Offer 6Gig';
      const ITEMS = [{
        OfferingId: 123,
        OfferingInstanceId: 321,
        PricingPlan: {
          Name: 'No $',
          BillerRuleInstanceThumbnails: [{
            Amount: 0
          }, {
            Amount: 0
          }, {
            Amount: 0
          }]
        },
        RecurringPeriodTypeCode: RECURRING_PERIOD_CODES.NO_RECURRENCE
      }, {
        OfferingId: 123,
        OfferingInstanceId: 321,
        PricingPlan: {
          Name: expectedLabel,
          BillerRuleInstanceThumbnails: [{
            Amount: 0
          }, {
            Amount: 150
          }, {
            Amount: 0
          }]
        },
        RecurringPeriodTypeCode: RECURRING_PERIOD_CODES.NO_RECURRENCE
      }, {
        OfferingId: 123,
        OfferingInstanceId: 321,
        PricingPlan: {
          Name: 'No $',
          BillerRuleInstanceThumbnails: [{
            Amount: 0
          }, {
            Amount: 0
          }, {
            Amount: 0
          }]
        },
        RecurringPeriodTypeCode: RECURRING_PERIOD_CODES.NO_RECURRENCE
      }];
      expect(Checkout.SubmitOrderProductList.resultFunc({
        Items: ITEMS
      }, {
        [ShopExternalDisplayNames.MOBILE]: {
          offerId: 123
        }
      })).toEqual([{
        label: expectedLabel,
        id: 321,
        altId: 123,
        address: LocaleKeys.ORDERING.LEGAL_ADDRESS,
        shipping: LocaleKeys.ORDERING.SHIPPING_TIME_MOBILE,
        isMobileOffer: true,
        isBenifyOffer: false,
        amount: null,
        campaignAmount: null
      }]);
    });
  });
});
