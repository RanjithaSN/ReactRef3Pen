import i18next from 'i18next';
import { CartSummaryDiscounts, CartSummaryItems, CartSummaryShoppingCartSubTotalAmount, CartSummarySubTotalAmount, CartSummarySubTotals } from './cart.summary.selectors';

describe('Cart Summary Selectors', () => {
  beforeEach(() => {
    i18next.t = jest.fn(() => 'translated string');
  });

  describe('CartSummaryDiscounts', () => {
    test('it should return a list of cart summary discounts for offers', () => {
      expect(CartSummaryDiscounts.resultFunc(true, true, [{}])).toEqual([{}]);
    });

    test('it should return an empty list otherwise', () => {
      expect(CartSummaryDiscounts.resultFunc(false, true, [{}])).toEqual([]);
      expect(CartSummaryDiscounts.resultFunc(false, false, [{}])).toEqual([]);
    });
  });

  describe('CartSummaryItems', () => {
    test('it should return a list of offer-based cart summary items', () => {
      expect(CartSummaryItems.resultFunc(true, false, [1], [2])).toEqual([1]);
    });

    test('it should return a list of add-on based cart summary items', () => {
      expect(CartSummaryItems.resultFunc(false, true, [1], [2])).toEqual([2]);
    });

    test('it should return an empty list otherwise', () => {
      expect(CartSummaryItems.resultFunc(false, false, [1], [2])).toEqual([]);
    });
  });

  describe('CartSummaryShoppingCartSubTotalAmount', () => {
    test('it should return a deposit total for DBSS environments and postpaid offers', () => {
      expect(CartSummaryShoppingCartSubTotalAmount.resultFunc(true, false, 10, 0, 20)).toBe(10);
    });
    test('it should return a cart total for DBSS environments and prepaid offers', () => {
      expect(CartSummaryShoppingCartSubTotalAmount.resultFunc(true, true, 10, 0, 20)).toBe(20);
    });

    test('it should return a cart total for ITV environments', () => {
      expect(CartSummaryShoppingCartSubTotalAmount.resultFunc(false, false, 10, 0, 20)).toBe(20);
      expect(CartSummaryShoppingCartSubTotalAmount.resultFunc(false, true, 10, 0, 20)).toBe(20);
    });

    test('it should return a deposit & down payment total for DBSS environments', () => {
      expect(
        CartSummaryShoppingCartSubTotalAmount.resultFunc(true, true, 5, 5, 20)
      ).toBe(25);
    });

    test('it should return a deposit & down payment total for DBSS environments', () => {
      expect(
        CartSummaryShoppingCartSubTotalAmount.resultFunc(true, false, 5, 5, 20)
      ).toBe(10);
    });

    test('it should return a cart total for ITV environments', () => {
      expect(
        CartSummaryShoppingCartSubTotalAmount.resultFunc(false, false, 5, 5, 20)
      ).toBe(20);
    });
  });

  describe('CartSummarySubTotalAmount', () => {
    test('it should return a sub total for offers', () => {
      expect(CartSummarySubTotalAmount.resultFunc(true, true, 50)).toEqual(50);
    });

    test('it should return zero otherwise', () => {
      expect(CartSummarySubTotalAmount.resultFunc(false, true, 50)).toBe(0);
      expect(CartSummarySubTotalAmount.resultFunc(false, false, 50)).toBe(0);
    });
  });

  describe('CartSummarySubTotals', () => {
    test('it should return a list of cart summary subtotals for offers', () => {
      expect(CartSummarySubTotals.resultFunc(true, true, [{}])).toEqual([{}]);
    });

    test('it should return an empty list otherwise', () => {
      expect(CartSummarySubTotals.resultFunc(false, true, [{}])).toEqual([]);
      expect(CartSummarySubTotals.resultFunc(false, false, [{}])).toEqual([]);
    });
  });
});
