import Immutable from 'seamless-immutable';
import LoadingStatus from '../../constants/loading.status';
import { INITIAL_STATE } from './saved.cart.reducer';
import * as CartSelectors from './saved.cart.selectors';

const appStore = new Immutable({
  ascendon: {
    subscriberApi: {
      ordering: {
        cart: INITIAL_STATE
      }
    }
  }
});

const CART_PATH = ['ascendon', 'subscriberApi', 'ordering', 'cart'];

describe('Cart', () => {
  describe('SavedCart', () => {
    test('it should return null when no data is present', () => {
      expect(CartSelectors.SavedCart.resultFunc()).toBe(null);
    });

    test('it should return cart state data if available', () => {
      expect(CartSelectors.SavedCart.resultFunc({
        data: 'yup'
      })).toEqual('yup');
    });
  });

  describe('SavedShoppingCart', () => {
    test('it should return null when no data is present', () => {
      expect(CartSelectors.SavedShoppingCart.resultFunc()).toBe(null);
    });

    test('it should return shopping cart data if available', () => {
      expect(CartSelectors.SavedShoppingCart.resultFunc({
        ShoppingCart: 'yup'
      })).toEqual('yup');
    });
  });

  describe('SavedShoppingCartCurrency', () => {
    test('it should return null when no shopping cart data is present', () => {
      expect(CartSelectors.SavedShoppingCartCurrency.resultFunc()).toBe(null);
    });

    test('it should return the currency of the shopping cart when available', () => {
      expect(CartSelectors.SavedShoppingCartCurrency.resultFunc({
        Currency: 'RAD'
      })).toEqual('RAD');
    });
  });

  describe('SavedShoppingCartItems', () => {
    test('it should return an empty list when no shopping cart data is present', () => {
      expect(CartSelectors.SavedShoppingCartItems.resultFunc()).toEqual([]);
    });

    test('it should return the a list of items when then shopping cart when available', () => {
      expect(CartSelectors.SavedShoppingCartItems.resultFunc({
        Items: [{}]
      })).toEqual([{}]);
    });
  });

  describe('IsFetchingSavedCart', () => {
    test('it should return false when savedCartStatus is UNLOADED', () => {
      const store = appStore.setIn([...CART_PATH, 'savedCartStatus'], LoadingStatus.UNLOADED);
      expect(CartSelectors.IsFetchingSavedCart(store)).toBe(false);
    });

    test('it should return false when savedCartStatus is LOADED', () => {
      const store = appStore.setIn([...CART_PATH, 'savedCartStatus'], LoadingStatus.LOADED);
      expect(CartSelectors.IsFetchingSavedCart(store)).toBe(false);
    });

    test('it should return true when savedCartStatus is LOADING', () => {
      const store = appStore.setIn([...CART_PATH, 'savedCartStatus'], LoadingStatus.LOADING);
      expect(CartSelectors.IsFetchingSavedCart(store)).toBe(true);
    });
  });

  describe('SavedShoppingCartBillerRuleTotals', () => {
    test('it should return an empty list if no totals exist', () => {
      expect(CartSelectors.SavedShoppingCartBillerRuleTotals.resultFunc({})).toEqual([]);
      expect(CartSelectors.SavedShoppingCartBillerRuleTotals.resultFunc(null)).toEqual([]);
    });

    test('it should return a list of totals if present', () => {
      expect(CartSelectors.SavedShoppingCartBillerRuleTotals.resultFunc({
        BillerRuleTotals: [{}]
      })).toEqual([{}]);
    });
  });

  describe('SavedShoppingCartTotalAmount', () => {
    test('it should return cart summary total if one is available', () => {
      expect(CartSelectors.SavedShoppingCartTotalAmount.resultFunc({
        TotalAmount: 50
      })).toEqual(50);
    });

    test('it should return zero otherwise', () => {
      expect(CartSelectors.SavedShoppingCartTotalAmount.resultFunc({})).toBe(0);
    });
  });

  describe('SavedShoppingCartDepositAmount', () => {
    test('it should return cart deposit total if one is available', () => {
      expect(CartSelectors.SavedShoppingCartDepositAmount.resultFunc({
        DepositAmount: 50
      })).toEqual(50);
    });

    test('it should return zero otherwise', () => {
      expect(CartSelectors.SavedShoppingCartDepositAmount.resultFunc({})).toBe(0);
    });
  });

  describe('IsSavedCartLoaded', () => {
    test('it should return false when savedCartStatus is UNLOADED', () => {
      const store = appStore.setIn([...CART_PATH, 'savedCartStatus'], LoadingStatus.UNLOADED);
      expect(CartSelectors.IsSavedCartLoaded(store)).toEqual(false);
    });

    test('it should return false when savedCartStatus is LOADING', () => {
      const store = appStore.setIn([...CART_PATH, 'savedCartStatus'], LoadingStatus.LOADING);
      expect(CartSelectors.IsSavedCartLoaded(store)).toEqual(false);
    });

    test('it should return true when savedCartStatus is LOADED', () => {
      const store = appStore.setIn([...CART_PATH, 'savedCartStatus'], LoadingStatus.LOADED);
      expect(CartSelectors.IsSavedCartLoaded(store)).toEqual(true);
    });
  });

  describe('SavedShoppingCartItemIsPrepaid', () => {
    test('it should return true when the first offer is Prepaid', () => {
      const store = appStore.setIn([...CART_PATH, 'data', 'ShoppingCart', 'Items', 0, 'Details', 'PricingPlan', 'Prepaid'], true);
      expect(CartSelectors.SavedShoppingCartItemIsPrepaid(store)).toBe(true);
    });

    test('it should return false the first offer is not Prepaid', () => {
      const store = appStore.setIn([...CART_PATH, 'data', 'ShoppingCart', 'Items', 0, 'Details', 'PricingPlan', 'Prepaid'], false);
      expect(CartSelectors.SavedShoppingCartItemIsPrepaid(store)).toBe(false);
    });
  });
});
