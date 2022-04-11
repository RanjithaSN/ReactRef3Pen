import PERIOD_TYPE from '@selfcare/core/constants/period.type';
import { FallbackCurrencyLocale } from '@selfcare/core/constants/transaction.constants';
import i18next from 'i18next';
import Immutable from 'seamless-immutable';
import { ActiveOfferingContextAttributes, DisplayOverlayedOfferSummaryPreview, MonthlyCostList, MoreConfigurationToDo, OfferingContextShoppingCart, OfferingContextShoppingCartCurrency, OfferingContextShoppingCartItems, OfferingContextValueDecisions, OfferingIdsNeedingAttributeSelection, ShoppingCartForEachActiveOfferingContext, ShoppingCartMonthlyTotalsForActiveOfferingContexts } from './offering.context.selectors';

describe('Offering Context Selectors', () => {
  beforeEach(() => {
    i18next.t = jest.fn(() => 'translated string');
  });

  const cart = {
    Items: [{
      OrderedOfferingName: 'Cart',
      Details: {
        PricingPlan: {
          Name: 'Playstation Vue Elite'
        }
      },
      DownPaymentAmount: 125
    }],
    PaymentInstrumentRequired: true,
    Currency: 'fr-CA',
    DepositAmount: 100,
    TotalAmount: 240,
    DiscountAmount: 220
  };

  describe('OfferingContextShoppingCart', () => {
    const item = {
      PricingPlanId: '999'
    };
    const physicalItem = {
      PricingPlanId: '123'
    };
    const completedDecision = {
      Id: '123||0||456',
      PhysicalInventoryCompletedDecision: {
        ModelId: 123
      }
    };

    test('It should return null when shopping cart is undefined', () => {
      expect(OfferingContextShoppingCart.resultFunc(undefined, [])).toBe(null);
    });

    test('It should return the shopping cart', () => {
      expect(OfferingContextShoppingCart.resultFunc(
        Immutable({
          ShoppingCart: {
            Items: [item]
          }
        }),
        []
      )).toEqual({
        Items: [item]
      });
    });

    test('It should add PhysicalInventories to relavent items', () => {
      expect(OfferingContextShoppingCart.resultFunc(
        Immutable({
          ShoppingCart: {
            Items: [item, physicalItem]
          }
        }),
        [completedDecision]
      )).toEqual({
        Items: [item, {
          ...physicalItem,
          PhysicalInventories: [completedDecision.PhysicalInventoryCompletedDecision]
        }]
      });
    });
  });

  describe('SavedShoppingCartCurrency', () => {
    test('it should return the shopping cart currency if one is available', () => {
      expect(OfferingContextShoppingCartCurrency.resultFunc(cart)).toEqual('fr-CA');
    });

    test('it should return null when no shopping cart is available', () => {
      expect(OfferingContextShoppingCartCurrency.resultFunc(null)).toBe(FallbackCurrencyLocale);
    });
  });

  describe('OfferingContextShoppingCartItems', () => {
    test('it should return an empty list if no shopping cart data is available', () => {
      expect(OfferingContextShoppingCartItems.resultFunc()).toEqual([]);
    });

    test('it should return a list of shopping cart items', () => {
      expect(OfferingContextShoppingCartItems.resultFunc({
        Items: [{}]
      })).toEqual([{}]);
    });
  });

  const dataByInstanceId = {
    0: {
      Context: {
        ValueDecisions: 'some decisions for 0'
      }
    },
    1: {
      Context: {
        ValueDecisions: 'some decisions for 1'
      }
    },
    2: {
      Context: {
        ValueDecisions: 'some decisions for 2'
      }
    }
  };

  describe('ActiveOfferingContextAttributes', () => {
    test('it should return an empty array if the offer context for attributes does not exist', () => {
      expect(ActiveOfferingContextAttributes.resultFunc({})).toEqual(null);
    });
    test('it should return the offer does for active offer context for attributes', () => {
      const activeOffer = 1;
      expect(ActiveOfferingContextAttributes.resultFunc(dataByInstanceId, activeOffer)).toEqual(dataByInstanceId[activeOffer]);
    });
  });

  describe('OfferingContextValueDecisions', () => {
    test('it should return an empty array if the value decisions do not exist', () => {
      expect(OfferingContextValueDecisions.resultFunc({})).toEqual([]);
    });
    test('it should return the value decisions for active offer', () => {
      expect(OfferingContextValueDecisions.resultFunc(dataByInstanceId[0])).toEqual(dataByInstanceId[0].Context.ValueDecisions);
    });
  });

  describe('ShoppingCartForEachActiveOfferingContext', () => {
    let offeringStatusHasFailure = false;
    const offerContexts = {
      2: {
        Context: {
          OfferingIds: [2]
        },
        ShoppingCart: {
          Total: 1
        }
      },
      1: {
        Context: {
          OfferingIds: [1]
        },
        ShoppingCart: {
          Total: 2
        }
      }
    };

    const offerStateByInstanceId = {
      1: 'ACTIVE',
      2: 'UNACTIVE'
    };
    test('it should return a list of the offering context of state active', () => {
      expect(ShoppingCartForEachActiveOfferingContext.resultFunc(offeringStatusHasFailure, offerContexts, offerStateByInstanceId)).toEqual([offerContexts[1].ShoppingCart]);
    });

    test('it should return an empty array if there are offering status failures', () => {
      offeringStatusHasFailure = true;
      expect(ShoppingCartForEachActiveOfferingContext.resultFunc(offeringStatusHasFailure, offerContexts, offerStateByInstanceId)).toEqual([]);
    });
  });

  describe('ShoppingCartMonthlyTotalsForActiveOfferingContexts', () => {
    const shoppingCartTotals = [{
      BillerRuleTotals: [{
        TotalAmount: 30,
        PeriodTypeCode: PERIOD_TYPE.MONTHLY
      }]
    }, {
      BillerRuleTotals: [{
        TotalAmount: 5,
        PeriodTypeCode: PERIOD_TYPE.MONTHLY
      }]
    }];
    const selectedLocale = 'sv-SE';
    const currencyCode = 'SEK';
    test('it should return the total amount of all the BRIs on active shopping carts', () => {
      const result = ShoppingCartMonthlyTotalsForActiveOfferingContexts.resultFunc(shoppingCartTotals, selectedLocale, currencyCode);
      expect(result.label).toBe('translated string');
      expect(result.total).toMatch(/35/);
      expect(result.mobileTotal).toMatch(/35/);
    });
  });

  describe('OfferingIdsNeedingAttributeSelection', () => {
    const carts = [{
      Offerings: {
        0: {
          OfferingId: 1
        }
      }
    },
    {
      Offerings: {
        0: {
          OfferingId: 2
        }
      }
    }];
    test('it should return the ids from the nested object from the shopping carts', () => {
      expect(OfferingIdsNeedingAttributeSelection.resultFunc(carts)).toEqual([1, 2]);
    });

    test('it should filter out any null ids', () => {
      carts.push({
        Offerings: {
          0: {
            OfferingId: null
          }
        }
      });
      expect(OfferingIdsNeedingAttributeSelection.resultFunc(carts)).toEqual([1, 2]);
    });
  });

  describe('MoreConfigurationToDo', () => {
    test('it should return true if more than one offering id is stored from in the local shopping carts', () => {
      const cartItems = [1, 2];
      expect(MoreConfigurationToDo.resultFunc(cartItems)).toEqual(true);
    });

    test('it should return false if only one offering id is in the stored cart', () => {
      const cartItems = [2];
      expect(MoreConfigurationToDo.resultFunc(cartItems)).toEqual(false);
    });
  });


  describe('MonthlyCostList', () => {
    const shoppingCartTotals = [{
      BillerRuleTotals: [{
        TotalAmount: 30,
        PeriodTypeCode: PERIOD_TYPE.MONTHLY
      }],
      Items: [{
        OrderedOfferingName: 'Offer Name'
      }]
    }, {
      BillerRuleTotals: [{
        TotalAmount: 5,
        PeriodTypeCode: PERIOD_TYPE.MONTHLY
      }],
      Items: [{
        OrderedOfferingName: 'Offer Name 2'
      }]
    }];

    const selectedLocale = 'sv-SE';
    const currencyCode = 'SEK';
    test('it should return the total amount of all the BRIs on active shopping carts', () => {
      const result = MonthlyCostList.resultFunc(shoppingCartTotals, selectedLocale, currencyCode);
      expect(result[0].label).toEqual('Offer Name');
      expect(result[0].cost).toMatch(/30/);
      expect(result[1].label).toEqual('Offer Name 2');
      expect(result[1].cost).toMatch(/5/);
    });

    test('it should return an empty array if there are no filteredTotals', () => {
      const noTotals = [{
        BillerRuleTotals: [{
          TotalAmount: 0,
          PeriodTypeCode: PERIOD_TYPE.MONTHLY
        }],
        Items: [{
          OrderedOfferingName: 'Offer Name 2'
        }]
      }];
      const result = MonthlyCostList.resultFunc(noTotals, selectedLocale, currencyCode);
      expect(result).toEqual([]);
    });
  });

  describe('DisplayOverlayedOfferSummaryPreview', () => {
    test('it should return false if shopping cart items is empty', () => {
      expect(DisplayOverlayedOfferSummaryPreview.resultFunc([])).toEqual(false);
    });
    test('it should return true if shopping cart items is not empty', () => {
      expect(DisplayOverlayedOfferSummaryPreview.resultFunc([{}])).toEqual(true);
    });
  });
});
