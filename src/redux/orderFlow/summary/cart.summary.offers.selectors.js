import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import LOADING_STATES from '@selfcare/core/constants/loading.status';
import PERIOD_TYPE from '@selfcare/core/constants/period.type';
import { IsDbss } from '@selfcare/core/redux/configuration/configuration.selectors';
import { OfferingDisplayName, OfferingsById, OfferingsStatusesById } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { SavedShoppingCart, SavedShoppingCartBillerRuleTotals, SavedShoppingCartHasTotals, SavedShoppingCartItems } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import i18next from 'i18next';
import keysIn from 'ramda/src/keysIn';
import pathOr from 'ramda/src/pathOr';
import valuesIn from 'ramda/src/valuesIn';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import LocaleKeys from '../../../locales/keys';
import { SavedShoppingCartItemsByInstanceId } from '../../cart/cart.selectors';
import { addBillingCycle, createBillingCycleTotal, DiscountLocaleStringFormatter, oneTimeRuleFilter, PeriodLocaleStringFormatter, recurringRuleFilter, SubTotalLocaleStringFormatter } from './summary.helpers';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';

const EMPTY_ARRAY = Immutable([]);

export const SavedCartBillingCycleTotals = createSelector(
  SavedShoppingCart,
  (cart) => createBillingCycleTotal(cart)
);

export const OfferCartSummaryBillerRuleTotals = createSelector(
  IsDbss,
  SavedShoppingCartBillerRuleTotals,
  SavedCartBillingCycleTotals,
  (isDbss, billerRuleTotals, cycleTotals) => (
    isDbss ? billerRuleTotals : cycleTotals
  )
);

const OfferCartFinanceTotal = createSelector(
  OfferCartSummaryBillerRuleTotals,
  (billerRuleTotals) => billerRuleTotals.find((total) => {
    return total.Type === BILLER_RULE_INSTANCE_TYPES.FINANCE &&
            (total.DiscountAmount || total.TotalAmount);
  })
);

const isMonthlyRecurring = ({ Type, PeriodTypeCode }) => {
  return Type === BILLER_RULE_INSTANCE_TYPES.RECURRING &&
        Number(PeriodTypeCode) === PERIOD_TYPE.MONTHLY;
};

export const OfferCartSummaryDiscounts = createSelector(
  OfferCartSummaryBillerRuleTotals,
  OfferCartFinanceTotal,
  DiscountLocaleStringFormatter,
  (billerRuleTotals, financeTotal, getDiscountLocaleStrings) => {
    let financeTotalMerged = false;
    return billerRuleTotals
      .filter((total) => total.Type !== BILLER_RULE_INSTANCE_TYPES.FINANCE)
      .map((total) => {
        const shouldMergeFinanceTotal = financeTotal && isMonthlyRecurring(total);
        financeTotalMerged = financeTotalMerged || shouldMergeFinanceTotal;
        return {
          labels: getDiscountLocaleStrings(total),
          amount: shouldMergeFinanceTotal ?
            total.DiscountAmount + financeTotal.DiscountAmount :
            total.DiscountAmount
        };
      })
      .concat((!financeTotal || financeTotalMerged) ? [] : {
        labels: getDiscountLocaleStrings(financeTotal),
        amount: financeTotal.DiscountAmount
      });
  }
);

export const OfferCartSummaryDownPaymentTotal = createSelector(
  SavedShoppingCartItems,
  (items) => items.reduce((acc, item) => {
    return acc + pathOr(0, ['DownPaymentAmount'], item);
  }, 0)
);

export const OfferCartSummarySubTotals = createSelector(
  OfferCartSummaryBillerRuleTotals,
  OfferCartFinanceTotal,
  OfferCartSummaryDownPaymentTotal,
  SubTotalLocaleStringFormatter,
  (billerRuleTotals, financeTotal, downPaymentTotal, getSubTotalLocaleStrings) => {
    let financeTotalMerged = false;
    let totals = billerRuleTotals
      .filter((total) => total.Type !== BILLER_RULE_INSTANCE_TYPES.FINANCE)
      .map((total) => {
        let amount = total.TotalAmount;

        if (financeTotal && isMonthlyRecurring(total)) {
          financeTotalMerged = true;
          amount += financeTotal.TotalAmount;
        }

        return {
          labels: getSubTotalLocaleStrings(total),
          amount
        };
      });
    if (financeTotal && !financeTotalMerged) {
      totals = totals.concat({
        labels: getSubTotalLocaleStrings(financeTotal),
        amount: financeTotal.TotalAmount
      });
    }
    if (downPaymentTotal) {
      totals = totals.concat({
        labels: [i18next.t(LocaleKeys.CART_SUMMARY.SUBTOTAL_DOWN_PAYMENTS)],
        amount: downPaymentTotal
      });
    }
    return totals;
  }
);

// TODO remove when new cart summary is implemented
const getTotalRollups = (items, formatter) => (
  items
    .reduce((result, { Details: { BillerRuleTotals, PricingPlan: { SubscriptionBillingCycle } } }) => (
      result
        .concat(recurringRuleFilter()(addBillingCycle(BillerRuleTotals, SubscriptionBillingCycle)))
        .concat(oneTimeRuleFilter()(addBillingCycle(BillerRuleTotals, SubscriptionBillingCycle)))
    ), [])
    .reduce((result, total) => (
      result.update(formatter(total).join(' '), (existing = []) => existing.concat(total))
    ), Immutable({}))
);

// TODO remove when new cart summary is implemented
const getRollupAmounts = (rollup) => (
  rollup.reduce((result, item) => (
    result
      .merge(item.without('Amount').without('TotalAmount'))
      .update('Amount', (currentAmount = 0) => currentAmount + item.Amount)
      .update('TotalAmount', (currentDiscount = 0) => currentDiscount + item.TotalAmount)
  ), Immutable({}))
);

export const OfferCartSummaryItems = createSelector(
  OfferingsById,
  OfferingsStatusesById,
  SavedShoppingCartItemsByInstanceId,
  SavedShoppingCartHasTotals,
  OfferCartSummaryDownPaymentTotal,
  PeriodLocaleStringFormatter,
  (
    offersById,
    statusesById,
    itemsById,
    cartHasTotals,
    downPaymentTotal,
    getPeriodLocaleStrings
  ) => {
    if (cartHasTotals) {
      // FIXME simplify when new cart summary is implemented
      return valuesIn(itemsById)
        .filter((items) => items.some(({ OfferingId }) => statusesById[OfferingId] === LOADING_STATES.LOADED))
        .map((items) => {
          const totalsByLabel = getTotalRollups(items, getPeriodLocaleStrings);

          const totals = keysIn(totalsByLabel)
            .map((label) => {
              const { Amount, TotalAmount } = getRollupAmounts(totalsByLabel[label]);

              return {
                amount: TotalAmount,
                beforeDiscount: Amount,
                label
              };
            })
            .map((total) => ({
              ...total,
              beforeDiscount: (!enableDiscounts() && total.beforeDiscount === total.amount) ? null : total.beforeDiscount
            }));

          const discountTotal = items
            .reduce((result, { Discounts }) => result.concat(Discounts), [])
            .reduce((result, discount) => result + pathOr(0, ['Amount'], discount), 0);

          const depositTotal = items
            .reduce((result, { Deposits }) => result.concat(Deposits), [])
            .reduce((result, deposit) => result + pathOr(0, ['TotalAmount'], deposit), 0);

          const [first] = items;
          const { Id: id, OfferingId } = first;
          const name = OfferingDisplayName(offersById[OfferingId]);

          return {
            id,
            name,
            discountTotal,
            depositTotal,
            downPaymentTotal,
            quantity: 1,
            totals
          };
        });
    }

    return EMPTY_ARRAY;
  }
);
