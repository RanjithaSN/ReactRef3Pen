import PERIOD_TYPE from '@selfcare/core/constants/period.type';
import { FallbackCurrencyLocale } from '@selfcare/core/constants/transaction.constants';
import { IsOfferingContextStatusUnloadedOrUncommitted, OfferingContextAttributesByInstanceId, OfferingContextsByInstanceId } from '@selfcare/core/redux/offeringContext/offering.context.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import i18next from 'i18next';
import groupBy from 'ramda/src/groupBy';
import pathOr from 'ramda/src/pathOr';
import pluck from 'ramda/src/pluck';
import sum from 'ramda/src/sum';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import LocaleKeys from '../../../locales/keys';
import { OFFER_STATE } from '../order.flow.constants';
import { ActiveOfferContext, ActiveOfferInstanceId, OfferStateByInstanceId } from '../order.flow.selectors';
import { CompletedPhysicalInventoryDecisions } from '../physicalInventory/physical.inventory.selectors';

const EMPTY_ARRAY = Immutable([]);

export const OfferingContextShoppingCart = createSelector(
  ActiveOfferContext,
  CompletedPhysicalInventoryDecisions,
  (offeringContextData, completedDecisions) => {
    let cart = pathOr(null, ['ShoppingCart'], offeringContextData);
    if (!cart) {
      return cart;
    }

    if (completedDecisions.length) {
      const completedDecisionsByPricingPlanId = groupBy(({ Id }) => Id.split('||')[0], completedDecisions);
      cart = cart.update('Items', (items) => items.reduce((acc, item) => {
        const completedDecisionsForPricingPlan = completedDecisionsByPricingPlanId[item.PricingPlanId];
        if (!completedDecisionsForPricingPlan) {
          return acc.concat(item);
        }
        return acc.concat(item.set(
          'PhysicalInventories',
          [completedDecisionsForPricingPlan.pop().PhysicalInventoryCompletedDecision]
        ));
      }, []));
    }

    return cart;
  }
);

export const OfferingContextShoppingCartItems = createSelector(
  OfferingContextShoppingCart,
  (cart) => {
    return pathOr(EMPTY_ARRAY, ['Items'], cart);
  }
);

export const OfferingContextShoppingCartCurrency = createSelector(
  OfferingContextShoppingCart,
  (shoppingCart) => {
    return pathOr(FallbackCurrencyLocale, ['Currency'], shoppingCart);
  }
);

export const OfferingContextShoppingCartItemIsPrepaid = createSelector(
  OfferingContextShoppingCartItems,
  (items) => (pathOr(false, [0, 'Details', 'PricingPlan', 'Prepaid'], items))
);

export const ActiveOfferingContextAttributes = createSelector(
  OfferingContextAttributesByInstanceId,
  ActiveOfferInstanceId,
  (byId, id) => pathOr(null, [id], byId)
);

export const OfferingContextValueDecisions = createSelector(
  ActiveOfferingContextAttributes,
  (offer) => pathOr([], ['Context', 'ValueDecisions'], offer)
);

export const ShoppingCartForEachActiveOfferingContext = createSelector([
  IsOfferingContextStatusUnloadedOrUncommitted,
  OfferingContextsByInstanceId,
  OfferStateByInstanceId
], (offeringStatusHasFailure, offeringContexts, offerStates) => {
  if (offeringStatusHasFailure) {
    return EMPTY_ARRAY;
  }
  const offerContextByActiveState = Object.values(offeringContexts).filter((offer) => {
    return offerStates[offer.Context.OfferingIds[0]] === OFFER_STATE.ACTIVE;
  });
  return pluck('ShoppingCart', Object.values(offerContextByActiveState));
});

export const ShoppingCartMonthlyTotalsForActiveOfferingContexts = createSelector([
  ShoppingCartForEachActiveOfferingContext,
  SelectedLocale,
  OfferingContextShoppingCartCurrency
], (shoppingCarts, selectedLocale, currencyCode) => {
  let billerRuleTotals = [];
  shoppingCarts.forEach((cart) => {
    const filteredTotals = cart.BillerRuleTotals.filter((billerRule) => {
      return billerRule.TotalAmount > 0 && Number(billerRule.PeriodTypeCode) === PERIOD_TYPE.MONTHLY;
    });

    billerRuleTotals = billerRuleTotals.concat(filteredTotals);
  });
  const currency = formatCurrency(sum(pluck('TotalAmount', billerRuleTotals)), currencyCode, selectedLocale);

  return {
    total: currency,
    label: i18next.t(LocaleKeys.PERIODS.MONTHLY),
    mobileTotal: `${currency.toUpperCase()}/${i18next.t(LocaleKeys.PERIOD_ABBREVIATIONS.MONTHLY)}`
  };
});

export const OfferingIdsNeedingAttributeSelection = createSelector([
  ShoppingCartForEachActiveOfferingContext
], (carts) => {
  return carts.map((cart) => pathOr(null, ['Offerings', '0', 'OfferingId'], cart)).filter((x) => x);
});

export const MoreConfigurationToDo = createSelector(
  OfferingIdsNeedingAttributeSelection,
  (idsToConfigure) => (idsToConfigure.length > 1)
);

export const MonthlyCostList = createSelector(
  ShoppingCartForEachActiveOfferingContext,
  SelectedLocale,
  OfferingContextShoppingCartCurrency,
  (shoppingCarts, selectedLocale, currencyCode) => {
    const costList = [];

    shoppingCarts.forEach((cart) => {
      const filteredTotals = cart.BillerRuleTotals
        .filter((billerRule) => {
          return billerRule.TotalAmount > 0 && Number(billerRule.PeriodTypeCode) === PERIOD_TYPE.MONTHLY;
        });

      if (filteredTotals.length) {
        const cost = formatCurrency(sum(pluck('TotalAmount', filteredTotals)), currencyCode, selectedLocale);
        costList.push({
          label: pathOr(null, ['Items', 0, 'OrderedOfferingName'], cart),
          cost
        });
      }
    });


    return costList;
  }
);

export const DisplayOverlayedOfferSummaryPreview = createSelector(
  OfferingContextShoppingCartItems,
  (cartItems) => Boolean(cartItems && cartItems.length)
);
