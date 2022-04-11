import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import TIMING from '@selfcare/core/constants/invoice.timing';
import PERIOD_TYPE from '@selfcare/core/constants/period.type';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { CodeItems } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import i18next from 'i18next';
import allPass from 'ramda/src/allPass';
import anyPass from 'ramda/src/anyPass';
import curry from 'ramda/src/curry';
import filter from 'ramda/src/filter';
import pathOr from 'ramda/src/pathOr';
import propEq from 'ramda/src/propEq';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import LocaleKeys from '../../../locales/keys';
import { OfferingContextShoppingCartItemIsPrepaid } from '../offeringContext/offering.context.selectors';

const EMPTY_ARRAY = Immutable([]);

export const BILLER_RULE_TOTAL_TYPES = {
  [BILLER_RULE_INSTANCE_TYPES.RECURRING]: 'RECURRING',
  [BILLER_RULE_INSTANCE_TYPES.ONE_TIME]: 'ONE_TIME',
  [BILLER_RULE_INSTANCE_TYPES.USAGE]: 'USAGE',
  [BILLER_RULE_INSTANCE_TYPES.FINANCE]: 'INSTALLMENT'
};

export const INVOICE_TIMINGS = {
  [TIMING.ON_CYCLE]: 'ON_BILLING_CYCLE',
  [TIMING.IMMEDIATELY]: 'TODAY'
};

export const createBillingCycleTotal = (cart) => {
  const plan = pathOr({}, ['Items', '0', 'Details', 'PricingPlan'], cart);
  const bri = pathOr({}, ['BillerRuleInstanceThumbnails', '0'], plan);
  const { InvoiceTiming } = bri;
  const { SubscriptionBillingCycle } = plan;

  if (SubscriptionBillingCycle) {
    return [{
      Amount: cart.GrossAmount,
      DiscountAmount: cart.DiscountAmount,
      InvoiceTiming,
      SubscriptionBillingCycle,
      TotalAmount: cart.TotalAmount,
      Type: BILLER_RULE_INSTANCE_TYPES.SUBSCRIPTION
    }];
  }

  return EMPTY_ARRAY;
};

export const addBillingCycle = (items, cycle) => (items || []).map((item) => ({
  ...item,
  SubscriptionBillingCycle: cycle
}));

export const recurringRuleFilter = (...predicates) => (
  filter(allPass([
    anyPass([
      propEq('Type', BILLER_RULE_INSTANCE_TYPES.RECURRING),
      propEq('Type', BILLER_RULE_INSTANCE_TYPES.SUBSCRIPTION),
      propEq('Type', BILLER_RULE_INSTANCE_TYPES.FINANCE)
    ]),
    ...predicates
  ]))
);

export const oneTimeRuleFilter = (...predicates) => (
  filter(allPass([propEq('Type', BILLER_RULE_INSTANCE_TYPES.ONE_TIME), ...predicates]))
);

export const nonNullAmount = ({ Amount }) => Amount !== null;

export const BillingCycleLookup = createSelector(
  CodeItems(CODES.SubscriptionBillingCycleType),
  (billingCycleTypes) => (
    billingCycleTypes.reduce((result, cycle) => result.set(cycle.Value, cycle), Immutable({}))
  )
);

export const periodTypeGetter = (key) => {
  if (key && Number(key) === PERIOD_TYPE.HOURLY) {
    return 'HOURLY';
  }
  if (key && Number(key) === PERIOD_TYPE.MONTHLY) {
    return 'MONTHLY';
  }
  if (key && Number(key) === PERIOD_TYPE.DAILY) {
    return 'DAILY';
  }
  if (key && Number(key) === PERIOD_TYPE.WEEKLY) {
    return 'WEEKLY';
  }
  if (key && Number(key) === PERIOD_TYPE.YEARLY) {
    return 'YEARLY';
  }
};

export const curriedSummaryLocaleStrings = curry(
  (
    keys,
    prefix,
    billingCycleLookup,
    isPrepaid,
    { InvoiceTiming, PeriodTypeCode, RecurringPeriodTypeCode, SubscriptionBillingCycle, Type }
  ) => {
    if (Type === BILLER_RULE_INSTANCE_TYPES.FINANCE) {
      return [i18next.t(keys[`${prefix}MONTHLY`])];
    }

    if (Type === BILLER_RULE_INSTANCE_TYPES.RECURRING) {
      let key;

      if (PeriodTypeCode && Number(PeriodTypeCode) !== 99) {
        key = PeriodTypeCode;
      } else if (RecurringPeriodTypeCode && Number(RecurringPeriodTypeCode) !== 99) {
        key = RecurringPeriodTypeCode;
      }

      return [i18next.t(keys[`${prefix}${periodTypeGetter(key)}`])];
    }

    if (Type === BILLER_RULE_INSTANCE_TYPES.SUBSCRIPTION) {
      return [i18next.t(keys[`${prefix}${pathOr('', [SubscriptionBillingCycle, 'Name'], billingCycleLookup).toUpperCase()}`])];
    }

    if (Type === BILLER_RULE_INSTANCE_TYPES.ONE_TIME && InvoiceTiming === TIMING.IMMEDIATELY) {
      return [i18next.t(keys[`${prefix}${INVOICE_TIMINGS[InvoiceTiming]}`])];
    }

    if (isPrepaid && InvoiceTiming === TIMING.ON_CYCLE) {
      return [
        i18next.t(keys[`${prefix}${BILLER_RULE_TOTAL_TYPES[Type]}`])
      ];
    }

    return [
      i18next.t(keys[`${prefix}${BILLER_RULE_TOTAL_TYPES[Type]}`]),
      i18next.t(LocaleKeys.INVOICE_TIMING[INVOICE_TIMINGS[InvoiceTiming]])
    ];
  }
);

const getPeriodLocaleStrings = curriedSummaryLocaleStrings(LocaleKeys.PERIODS, '');
const getDiscountLocaleStrings = curriedSummaryLocaleStrings(LocaleKeys.CART_SUMMARY, 'DISCOUNT_');
const getSubTotalLocaleStrings = curriedSummaryLocaleStrings(LocaleKeys.CART_SUMMARY, 'SUBTOTAL_');

// FIXME: Ultimately, using an offering context selector here will not work, there's very likely a bug here
export const PeriodLocaleStringFormatter = createSelector(
  BillingCycleLookup,
  OfferingContextShoppingCartItemIsPrepaid,
  (billingCycleLookup, isPrepaid) => getPeriodLocaleStrings(billingCycleLookup, isPrepaid)
);

export const DiscountLocaleStringFormatter = createSelector(
  BillingCycleLookup,
  OfferingContextShoppingCartItemIsPrepaid,
  (billingCycleLookup, isPrepaid) => getDiscountLocaleStrings(billingCycleLookup, isPrepaid)
);

export const SubTotalLocaleStringFormatter = createSelector(
  BillingCycleLookup,
  OfferingContextShoppingCartItemIsPrepaid,
  (billingCycleLookup, isPrepaid) => getSubTotalLocaleStrings(billingCycleLookup, isPrepaid)
);
