import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import PERIOD_TYPE from '@selfcare/core/constants/period.type';
import i18next from 'i18next';
import Immutable from 'seamless-immutable';
import { OfferCartSummaryBillerRuleTotals, OfferCartSummaryDiscounts, OfferCartSummaryDownPaymentTotal, OfferCartSummarySubTotals, SavedCartBillingCycleTotals } from './cart.summary.offers.selectors';

describe('Offer-based Cart Summary Selectors', () => {
  beforeEach(() => {
    i18next.t = jest.fn(() => 'translated string');
  });

  const formatter = () => ['translated string'];

  describe('OfferCartSummaryDiscounts', () => {
    test('it should return an array of cart discount items', () => {
      expect(OfferCartSummaryDiscounts.resultFunc([{
        DiscountAmount: 5,
        Type: BILLER_RULE_INSTANCE_TYPES.RECURRING
      }, {
        DiscountAmount: 8,
        Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
      }, {
        DiscountAmount: 13,
        Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
      }], undefined, formatter)).toEqual([{
        amount: 5,
        labels: ['translated string']
      }, {
        amount: 8,
        labels: ['translated string']
      }, {
        amount: 13,
        labels: ['translated string']
      }]);
    });

    test('it should combine the finance and monthly recurring dicsount totals', () => {
      expect(OfferCartSummaryDiscounts.resultFunc([{
        Type: BILLER_RULE_INSTANCE_TYPES.RECURRING,
        PeriodTypeCode: PERIOD_TYPE.MONTHLY,
        DiscountAmount: 5
      }], {
        Type: BILLER_RULE_INSTANCE_TYPES.FINANCE,
        DiscountAmount: 5
      }, formatter)).toEqual([{
        amount: 10,
        labels: ['translated string']
      }]);
    });

    test('it should add finance discount total when there is no monthly recurring total', () => {
      expect(OfferCartSummaryDiscounts.resultFunc([{
        Type: BILLER_RULE_INSTANCE_TYPES.RECURRING,
        PeriodTypeCode: PERIOD_TYPE.YEARLY,
        DiscountAmount: 5
      }], {
        Type: BILLER_RULE_INSTANCE_TYPES.FINANCE,
        DiscountAmount: 5
      }, formatter)).toEqual([{
        amount: 5,
        labels: ['translated string']
      }, {
        amount: 5,
        labels: ['translated string']
      }]);
    });
  });

  describe('OfferCartSummaryDownPaymentTotal', () => {
    test('it should return the sum of all cart item down payments', () => {
      expect(OfferCartSummaryDownPaymentTotal.resultFunc([{
        DownPaymentAmount: 5
      }, {
        DownPaymentAmount: 5
      }, {
        DownPaymentAmount: undefined
      }])).toBe(10);
    });
  });

  describe('OfferCartSummarySubTotals', () => {
    test('it should return an array of cart subtotal items', () => {
      expect(OfferCartSummarySubTotals.resultFunc([{
        TotalAmount: 5,
        Type: BILLER_RULE_INSTANCE_TYPES.RECURRING
      }, {
        TotalAmount: 8,
        Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
      }, {
        TotalAmount: 13,
        Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
      }], undefined, 0, formatter)).toEqual([{
        amount: 5,
        labels: ['translated string']
      }, {
        amount: 8,
        labels: ['translated string']
      }, {
        amount: 13,
        labels: ['translated string']
      }]);
    });

    test('it should combine the finance and monthly recurring dicsount totals', () => {
      expect(OfferCartSummarySubTotals.resultFunc([{
        Type: BILLER_RULE_INSTANCE_TYPES.RECURRING,
        PeriodTypeCode: PERIOD_TYPE.MONTHLY,
        TotalAmount: 5
      }], {
        Type: BILLER_RULE_INSTANCE_TYPES.FINANCE,
        TotalAmount: 5
      }, 0, formatter)).toEqual([{
        amount: 10,
        labels: ['translated string']
      }]);
    });

    test('it should add finance discount total when there is no monthly recurring total', () => {
      expect(OfferCartSummarySubTotals.resultFunc([{
        Type: BILLER_RULE_INSTANCE_TYPES.RECURRING,
        PeriodTypeCode: PERIOD_TYPE.YEARLY,
        TotalAmount: 5
      }], {
        Type: BILLER_RULE_INSTANCE_TYPES.FINANCE,
        TotalAmount: 5
      }, 0, formatter)).toEqual([{
        amount: 5,
        labels: ['translated string']
      }, {
        amount: 5,
        labels: ['translated string']
      }]);
    });

    test('it should append non-zero down payments subtotal', () => {
      expect(OfferCartSummarySubTotals.resultFunc([], undefined, 10, formatter)).toEqual([{
        amount: 10,
        labels: ['translated string']
      }]);
    });
  });

  describe('SavedCartBillingCycleTotals', () => {
    const cart = Immutable({
      Items: [{
        Details: {
          PricingPlan: {
            BillerRuleInstanceThumbnails: [{
              InvoiceTiming: 1
            }],
            SubscriptionBillingCycle: 2
          }
        }
      }],
      GrossAmount: 30,
      DiscountAmount: 10,
      TotalAmount: 20
    });

    test('it should return a list of totals if present', () => {
      expect(SavedCartBillingCycleTotals.resultFunc(cart)).toEqual([{
        Amount: 30,
        DiscountAmount: 10,
        InvoiceTiming: 1,
        SubscriptionBillingCycle: 2,
        TotalAmount: 20,
        Type: BILLER_RULE_INSTANCE_TYPES.SUBSCRIPTION
      }]);
    });

    test('it should return an empty list if no billing cycle is a present', () => {
      expect(
        SavedCartBillingCycleTotals.resultFunc(
          cart.setIn(['Items', '0', 'Details', 'PricingPlan', 'SubscriptionBillingCycle'], null)
        )
      ).toEqual([]);
    });
  });

  describe('OfferCartSummaryBillerRuleTotals', () => {
    test('it should return a list of DBSS totals in DBSS environments', () => {
      expect(
        OfferCartSummaryBillerRuleTotals.resultFunc(
          true,
          [{
            dbss: true
          }],
          [{
            dbss: false
          }]
        )
      ).toEqual([{
        dbss: true
      }]);
    });

    test('it should return a list of ITV totals in ITV environments', () => {
      expect(
        OfferCartSummaryBillerRuleTotals.resultFunc(
          false,
          [{
            dbss: true
          }],
          [{
            dbss: false
          }]
        )
      ).toEqual([{
        dbss: false
      }]);
    });
  });
});
