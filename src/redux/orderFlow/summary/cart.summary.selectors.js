import { IsDbss } from '@selfcare/core/redux/configuration/configuration.selectors';
import { SavedShoppingCartDepositAmount, SavedShoppingCartItemIsPrepaid, SavedShoppingCartTotalAmount } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { CartHasAddOns, CartHasOffers } from '../../cart/cart.selectors';
import { AddOnCartSummaryItems } from './cart.summary.add.ons.selectors';
import { OfferCartSummaryDiscounts, OfferCartSummaryDownPaymentTotal, OfferCartSummaryItems, OfferCartSummarySubTotals } from './cart.summary.offers.selectors';

const EMPTY_ARRAY = Immutable([]);

export const CartSummaryShoppingCartSubTotalAmount = createSelector([
  IsDbss,
  SavedShoppingCartItemIsPrepaid,
  SavedShoppingCartDepositAmount,
  OfferCartSummaryDownPaymentTotal,
  SavedShoppingCartTotalAmount
], (isDbss, isPrepaid, depositAmount, downPaymentTotal, totalAmount) => {
  let total = totalAmount;
  if (isDbss) {
    total = ((isPrepaid) ? totalAmount : depositAmount) + downPaymentTotal;
  }
  return total;
});

export const CartSummaryItems = createSelector(
  CartHasOffers,
  CartHasAddOns,
  OfferCartSummaryItems,
  AddOnCartSummaryItems,
  (cartHasOffers, cartHasAddOns, offerItems, addOnItems) => {
    if (cartHasOffers) {
      return offerItems;
    }

    if (cartHasAddOns) {
      return addOnItems;
    }

    return EMPTY_ARRAY;
  }
);

export const CartSummarySubTotalAmount = createSelector(
  CartHasOffers,
  CartHasAddOns,
  CartSummaryShoppingCartSubTotalAmount,
  (cartHasOffers, cartHasAddOns, offersSubTotal) => {
    if (cartHasOffers) {
      return offersSubTotal;
    }

    return 0;
  }
);

export const CartSummarySubTotals = createSelector(
  CartHasOffers,
  CartHasAddOns,
  OfferCartSummarySubTotals,
  (cartHasOffers, cartHasAddOns, offersSubTotals) => {
    if (cartHasOffers) {
      return offersSubTotals;
    }

    return EMPTY_ARRAY;
  }
);

export const CartSummaryDiscounts = createSelector(
  CartHasOffers,
  CartHasAddOns,
  OfferCartSummaryDiscounts,
  (cartHasOffers, cartHasAddOns, offersDiscounts) => {
    if (cartHasOffers) {
      return offersDiscounts;
    }

    return EMPTY_ARRAY;
  }
);
