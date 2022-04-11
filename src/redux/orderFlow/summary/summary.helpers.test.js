import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import TIMING from '@selfcare/core/constants/invoice.timing';
import i18next from 'i18next';
import Immutable from 'seamless-immutable';
import { BillingCycleLookup, curriedSummaryLocaleStrings, DiscountLocaleStringFormatter, PeriodLocaleStringFormatter, SubTotalLocaleStringFormatter } from './summary.helpers';

describe('Summary Helpers', () => {
  beforeEach(() => {
    i18next.t = jest.fn(() => 'translated string');
  });

  describe('PeriodLocaleStringFormatter', () => {
    test('it should return a formatter function', () => {
      expect(PeriodLocaleStringFormatter.resultFunc({}, false)).toBeTruthy();
    });
  });

  describe('SubTotalLocaleStringFormatter', () => {
    test('it should return a formatter function', () => {
      expect(SubTotalLocaleStringFormatter.resultFunc({}, false)).toBeTruthy();
    });
  });

  describe('DiscountLocaleStringFormatter', () => {
    test('it should return a formatter function', () => {
      expect(DiscountLocaleStringFormatter.resultFunc({}, false)).toBeTruthy();
    });
  });

  describe('BillingCycleLookup', () => {
    test('it should return a normalized map of billing cycle objects', () => {
      expect(BillingCycleLookup.resultFunc([{
        Value: 1
      }, {
        Value: 2
      }])).toEqual({
        1: {
          Value: 1
        },
        2: {
          Value: 2
        }
      });
    });
  });

  describe('curriedSummaryLocaleStrings', () => {
    const lookup = {
      1: {
        Name: 'Monthly'
      },
      2: {
        Name: 'Every 5 Decades'
      }
    };
    const keys = {
      SOME_PREFIX_MONTHLY: 'per month, I guess',
      SOME_PREFIX_EVERY_5_DECADES: 'so many decades'
    };

    test('it should return a single-item list of locale strings for finance BRIs', () => {
      const bri = Immutable({
        Type: BILLER_RULE_INSTANCE_TYPES.FINANCE
      });

      expect(
        curriedSummaryLocaleStrings(keys, '', lookup, false, bri)
      ).toEqual(['translated string']);
    });

    test('it should return a single-item list of locale strings for recurring BRIs', () => {
      const bri = Immutable({
        PeriodTypeCode: 1,
        InvoiceTiming: TIMING.IMMEDIATELY,
        Type: BILLER_RULE_INSTANCE_TYPES.RECURRING
      });

      expect(
        curriedSummaryLocaleStrings(keys, 'SOME_PREFIX_', lookup, false, bri)
      ).toEqual(['translated string']);

      expect(
        curriedSummaryLocaleStrings(
          keys,
          'SOME_PREFIX_',
          lookup,
          false,
          bri.set('PeriodTypeCode', null).set('RecurringPeriodTypeCode', 2)
        )
      ).toEqual(['translated string']);

      expect(
        curriedSummaryLocaleStrings(
          keys,
          'SOME_PREFIX_',
          lookup,
          false,
          bri.set('PeriodTypeCode', null).set('RecurringPeriodTypeCode', 6)
        )
      ).toEqual(['translated string']);

      expect(
        curriedSummaryLocaleStrings(
          keys,
          'SOME_PREFIX_',
          undefined,
          false,
          bri.set('PeriodTypeCode', null).set('SubscriptionBillingCycle', 2)
        )
      ).toEqual(['translated string']);
    });

    test('it should return a two-item list of locale strings for one-time, non-immediate BRIs', () => {
      const bri = Immutable({
        InvoiceTiming: TIMING.ON_CYCLE,
        Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
      });

      expect(
        curriedSummaryLocaleStrings(keys, 'SOME_PREFIX_', undefined, false, bri)
      ).toEqual(['translated string', 'translated string']);
    });

    test('it should return a single-item list of locale strings for one-time, non-immediate BRIs on a prepaid offer', () => {
      const bri = Immutable({
        InvoiceTiming: TIMING.ON_CYCLE,
        Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
      });

      expect(
        curriedSummaryLocaleStrings(keys, 'SOME_PREFIX_', undefined, true, bri)
      ).toEqual(['translated string']);
    });

    test('it should return a single-item list of locale strings for one-time, immediate BRIs', () => {
      const bri = Immutable({
        InvoiceTiming: TIMING.IMMEDIATELY,
        Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
      });

      expect(
        curriedSummaryLocaleStrings(keys, 'SOME_PREFIX_', undefined, false, bri)
      ).toEqual(['translated string']);
    });
  });
});
