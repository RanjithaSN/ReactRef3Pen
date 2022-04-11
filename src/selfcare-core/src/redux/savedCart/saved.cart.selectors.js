import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import {createSelector} from 'reselect';
import Immutable from 'seamless-immutable';
import LoadingStatus from '../../constants/loading.status';
import {Ordering} from '../ordering/ordering.selectors';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  Ordering
], (client) => {
  return pathOr(null, ['cart'], client);
});

export const SavedCart = createSelector(
  Base,
  (cart) => {
    return pathOr(null, ['data'], cart);
  }
);

export const SavedShoppingCart = createSelector(
  SavedCart,
  (cart) => {
    return pathOr(null, ['ShoppingCart'], cart);
  }
);

export const SavedShoppingCartCurrency = createSelector(
  SavedShoppingCart,
  (cart) => pathOr(null, ['Currency'], cart)
);

export const SavedShoppingCartItems = createSelector(
  SavedShoppingCart,
  (cart) => pathOr(EMPTY_ARRAY, ['Items'], cart)
);

export const SavedShoppingCartDepositAmount = createSelector(
  SavedShoppingCart,
  (cart) => (pathOr(0, ['DepositAmount'], cart))
);

export const SavedShoppingCartTotalAmount = createSelector(
  SavedShoppingCart,
  (cart) => (pathOr(0, ['TotalAmount'], cart))
);

export const SavedShoppingCartItemIsPrepaid = createSelector(
  SavedShoppingCartItems,
  (items) => (pathOr(false, [0, 'Details', 'PricingPlan', 'Prepaid'], items))
);

export const SavedShoppingCartBillerRuleTotals = createSelector(
  SavedShoppingCart,
  (cart) => (
    pathOr(EMPTY_ARRAY, ['BillerRuleTotals'], cart)
  )
);

export const SavedShoppingCartHasTotals = createSelector(
  SavedShoppingCart,
  (cart) => Boolean(pathOr(EMPTY_ARRAY, ['BillerRuleTotals'], cart).length)
);

export const IsFetchingSavedCart = createSelector(
  Base,
  (cart) => {
    return path(['savedCartStatus'], cart) === LoadingStatus.LOADING;
  }
);

export const IsSavedCartLoaded = createSelector(
  Base,
  (cart) => {
    const status = path(['savedCartStatus'], cart);

    return status === LoadingStatus.LOADED || status === LoadingStatus.UPDATED;
  }
);
