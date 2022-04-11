import { SavedCartTypes } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import Immutable from 'seamless-immutable';
import { OrderFlowTypes } from './order.flow.actions';
import { activeOfferId, activeOfferInstanceId, completedOfferingCart, currentDecisionPageIndex, decisionPages, decisionsById, decisionsByPage, offerStateByInstanceId, savedCompletedDecisions, selectedPaymentInstrumentId } from './order.flow.reducers';

const noop = {
  type: 'some random action'
};

describe('Current Decision Page Index Reducer', () => {
  test('does not respond to foreign events', () => {
    expect(currentDecisionPageIndex(null, noop)).toBeNull();
  });

  test('returns a default state when state is initially undefined', () => {
    expect(currentDecisionPageIndex(undefined, noop)).toBeNull();
  });

  test('returns the default state when a shopping cart is cleared', () => {
    expect(currentDecisionPageIndex({}, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the cart is saved', () => {
    expect(currentDecisionPageIndex({}, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the active offering is cleared', () => {
    expect(currentDecisionPageIndex({}, {
      type: OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT
    })).toBe(null);
  });

  test('sets the current index to zero when customizing an offer', () => {
    expect(currentDecisionPageIndex(null, {
      type: OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT,
      payload: {
        Context: {
          Pages: [{
            Id: 1
          }, {
            Id: 2
          }]
        }
      }
    })).toBe(0);
  });

  test('updates the current decision page index', () => {
    expect(currentDecisionPageIndex(null, {
      type: OrderFlowTypes.NAVIGATE_TO_DECISION_PAGE,
      payload: 1
    })).toBe(1);
  });
});

describe('Decisions By Page Reducer', () => {
  test('does not respond to foreign events', () => {
    expect(decisionsByPage(null, noop)).toBeNull();
  });

  test('returns a default state when state is initially undefined', () => {
    expect(decisionsByPage(undefined, noop)).toEqual(Immutable({}));
  });

  test('returns the default state when a shopping cart is cleared', () => {
    expect(decisionsByPage(null, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toEqual(Immutable({}));
  });

  test('returns the default state when the cart is saved', () => {
    expect(decisionsByPage(null, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toEqual(Immutable({}));
  });

  test('returns the default state when the active offering is cleared', () => {
    expect(decisionsByPage(null, {
      type: OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT
    })).toEqual(Immutable({}));
  });

  test('organizes decisions by page', () => {
    expect(decisionsByPage(Immutable({}), {
      type: OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT,
      payload: {
        Context: {
          Pages: [{
            Id: 1
          }, {
            Id: 2
          }],
          Decisions: [{
            Id: 3,
            PageId: 1
          }, {
            Id: 4,
            PageId: 1
          }, {
            Id: 5,
            PageId: 2
          }]
        }
      }
    })).toEqual({
      1: [3, 4],
      2: [5]
    });
  });
});

describe('Decision Pages Reducer', () => {
  test('does not respond to foreign events', () => {
    expect(decisionPages(null, noop)).toBeNull();
  });

  test('returns a default state when state is initially undefined', () => {
    expect(decisionPages(undefined, noop)).toEqual(Immutable([]));
  });

  test('returns the default state when a shopping cart is cleared', () => {
    expect(decisionPages(null, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toEqual(Immutable([]));
  });

  test('returns the default state when the cart is saved', () => {
    expect(decisionPages(null, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toEqual(Immutable([]));
  });

  test('returns the default state when the active offering is cleared', () => {
    expect(decisionPages(null, {
      type: OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT
    })).toEqual(Immutable([]));
  });

  test('stores all decision pages', () => {
    expect(decisionPages(Immutable([]), {
      type: OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT,
      payload: {
        Context: {
          Pages: [1, 2]
        }
      }
    })).toEqual([1, 2]);
  });
});

describe('Decisions By ID Reducer', () => {
  test('does not respond to foreign events', () => {
    expect(decisionsById(null, noop)).toBeNull();
  });

  test('returns a default state when state is initially undefined', () => {
    expect(decisionsById(undefined, noop)).toEqual(Immutable({}));
  });

  test('returns the default state when a shopping cart is cleared', () => {
    expect(decisionsById({
      whatHaveWe: 'Here'
    }, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toEqual(Immutable({}));
  });

  test('returns the default state when the cart is saved', () => {
    expect(decisionsById({
      whatHaveWe: 'Here'
    }, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toEqual(Immutable({}));
  });

  test('returns the default state when the active offering is cleared', () => {
    expect(decisionsById({
      whatHaveWe: 'Here'
    }, {
      type: OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT
    })).toEqual(Immutable({}));
  });

  test('organizes decisions by their ID when beginning a new offer', () => {
    const state = decisionsById(Immutable({}), {
      type: OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT,
      payload: {
        Context: {
          Decisions: [{
            Id: 1
          }, {
            Id: 2
          }]
        }
      }
    });

    expect(state).toEqual({
      1: {
        Id: 1
      },
      2: {
        Id: 2
      }
    });
  });

  test('updates a quantity decision to some specific value', () => {
    const state = decisionsById(Immutable({
      1: {
        Options: [{
          Id: 2,
          Quantity: 1
        }, {
          Id: 3,
          Quantity: 1
        }]
      }
    }), {
      type: OrderFlowTypes.UPDATE_QUANTITY_DECISION,
      payload: {
        decisionId: 1,
        optionId: 2,
        quantity: 3
      }
    });

    expect(state).toEqual({
      1: {
        Options: [{
          Id: 2,
          Quantity: 3
        }, {
          Id: 3,
          Quantity: 1
        }]
      }
    });
  });

  test('toggles a decision group option on and others off', () => {
    const state = decisionsById(Immutable({
      1: {
        Options: [{
          Id: 2,
          MinimumQuantity: 1,
          Quantity: 1,
          Selected: null
        }, {
          Id: 3,
          MinimumQuantity: 1,
          Quantity: 1,
          Selected: true
        }]
      }
    }), {
      type: OrderFlowTypes.TOGGLE_DECISION_GROUP_OPTION_SELECTION,
      payload: {
        decisionId: 1,
        optionId: 2
      }
    });

    expect(state).toEqual({
      1: {
        Options: [{
          Id: 2,
          MinimumQuantity: 1,
          Quantity: 1,
          Selected: true
        }, {
          Id: 3,
          MinimumQuantity: 1,
          Quantity: 0,
          Selected: false
        }]
      }
    });
  });
  test('does not allow deselection if one is required', () => {
    const state = decisionsById(Immutable({
      1: {
        Options: [{
          Id: 2,
          MinimumQuantity: 1,
          Quantity: 0,
          Selected: null
        }, {
          Id: 3,
          MinimumQuantity: 1,
          Quantity: 1,
          Selected: true
        }]
      }
    }), {
      type: OrderFlowTypes.TOGGLE_DECISION_GROUP_OPTION_SELECTION,
      payload: {
        decisionId: 1,
        optionId: 3
      }
    });

    expect(state).toEqual({
      1: {
        Options: [{
          Id: 2,
          MinimumQuantity: 1,
          Quantity: 0,
          Selected: false
        }, {
          Id: 3,
          MinimumQuantity: 1,
          Quantity: 1,
          Selected: false
        }]
      }
    });
  });
  test('allows toggle off of all options if MinimumQuantity is 0', () => {
    const state = decisionsById(Immutable({
      1: {
        Options: [{
          Id: 2,
          MinimumQuantity: 0,
          Quantity: 1,
          Selected: null
        }, {
          Id: 3,
          MinimumQuantity: 0,
          Quantity: 1,
          Selected: true
        }]
      }
    }), {
      type: OrderFlowTypes.TOGGLE_DECISION_GROUP_OPTION_SELECTION,
      payload: {
        decisionId: 1,
        optionId: 3
      }
    });

    expect(state).toEqual({
      1: {
        Options: [{
          Id: 2,
          MinimumQuantity: 0,
          Quantity: 0,
          Selected: false
        }, {
          Id: 3,
          MinimumQuantity: 0,
          Quantity: 0,
          Selected: false
        }]
      }
    });
  });

  test('updates a group decision quantity to some specific value', () => {
    const state = decisionsById(Immutable({
      1: {
        Options: [{
          Id: 2,
          Quantity: 1,
          Selected: null
        }, {
          Id: 3,
          Quantity: 1,
          Selected: true
        }]
      }
    }), {
      type: OrderFlowTypes.UPDATE_DECISION_GROUP_QUANTITY,
      payload: {
        decisionId: 1,
        optionId: 2,
        quantity: 3
      }
    });

    expect(state).toEqual({
      1: {
        Options: [{
          Id: 2,
          Quantity: 3,
          Selected: true
        }, {
          Id: 3,
          Quantity: 1,
          Selected: true
        }]
      }
    });
  });

  test('updates an option item quantity', () => {
    const state = decisionsById(Immutable({
      1: {
        Options: [{
          Id: 2,
          Quantity: 1,
          Selected: null,
          Items: [{
            DecisionGroupOptionItemId: 3,
            Quantity: 1
          }, {
            DecisionGroupOptionItemId: 4,
            Quantity: 1
          }]
        }, {
          Id: 3,
          Quantity: 1,
          Selected: true
        }]
      }
    }), {
      type: OrderFlowTypes.UPDATE_OPTION_ITEM_QUANTITY,
      payload: {
        decisionId: 1,
        optionId: 2,
        itemId: 3,
        quantity: 4
      }
    });

    expect(state).toEqual({
      1: {
        Options: [{
          Id: 2,
          Quantity: 1,
          Selected: null,
          Items: [{
            DecisionGroupOptionItemId: 3,
            Quantity: 4
          }, {
            DecisionGroupOptionItemId: 4,
            Quantity: 1
          }]
        }, {
          Id: 3,
          Quantity: 1,
          Selected: true
        }]
      }
    });
  });
});

describe('Active Offer ID Reducer', () => {
  test('returns the default state when a shopping cart is cleared', () => {
    expect(activeOfferId({}, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the cart is saved', () => {
    expect(activeOfferId({}, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the active offer is cleared', () => {
    expect(activeOfferId({}, {
      type: OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT
    })).toBe(null);
  });

  test('sets current offer id to the active offer specified', () => {
    expect(activeOfferId(null, {
      type: OrderFlowTypes.SET_ACTIVE_OFFER_IDS,
      payload: {
        offerId: 'offer1'
      }
    })).toEqual('offer1');
  });
});

describe('Offer State by Instance Id Reducer', () => {
  const state = Immutable({});
  test('returns the default state when a shopping cart is cleared', () => {
    expect(offerStateByInstanceId(state, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toEqual({});
  });

  test('returns the default state when the cart is saved', () => {
    expect(offerStateByInstanceId(state, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toEqual({});
  });

  test('returns the default state when the active offer is cleared', () => {
    expect(offerStateByInstanceId(state, {
      type: OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT,
      payload: {
        offerInstanceId: 'offer1'
      }
    })).toEqual({
      offer1: 'UNACTIVE'
    });
  });

  test('sets current offer id to the active offer specified', () => {
    expect(offerStateByInstanceId(state, {
      type: OrderFlowTypes.SET_ACTIVE_OFFER_IDS,
      payload: {
        offerInstanceId: 'offer1'
      }
    })).toEqual({
      offer1: 'ACTIVE'
    });
  });

  test('sets current offer id to configured offer', () => {
    expect(offerStateByInstanceId(state, {
      type: OrderFlowTypes.SET_OFFER_AS_CONFIGURED,
      payload: {
        offerInstanceId: 'offer1'
      }
    })).toEqual({
      offer1: 'CONFIGURED'
    });
  });
});

describe('Active Offer Instance ID Reducer', () => {
  test('returns the default state when a shopping cart is cleared', () => {
    expect(activeOfferInstanceId({}, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the cart is saved', () => {
    expect(activeOfferInstanceId({}, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the active offering is cleared', () => {
    expect(activeOfferInstanceId({}, {
      type: OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT
    })).toBe(null);
  });

  test('sets current offer id to the active offer specified', () => {
    expect(activeOfferInstanceId(null, {
      type: OrderFlowTypes.SET_ACTIVE_OFFER_IDS,
      payload: {
        offerInstanceId: 'offer1'
      }
    })).toEqual('offer1');
  });
});

describe('Completed Offering Cart Reducer', () => {
  test('sets the completed offering cart when an offer is being customized', () => {
    const ShoppingCart = {
      Hello: 'General Kenobi'
    };
    expect(completedOfferingCart(null, {
      payload: {
        ShoppingCart
      },
      type: OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT
    })).toEqual(ShoppingCart);
  });

  test('clears the completed offering cart', () => {
    expect(completedOfferingCart({}, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the cart is saved', () => {
    expect(completedOfferingCart({}, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the active offering is cleared', () => {
    expect(completedOfferingCart({}, {
      type: OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT
    })).toBe(null);
  });

  test('does not respond to foreign events', () => {
    expect(completedOfferingCart(1, {
      type: 'foreign'
    })).toEqual(1);
  });
});

describe('Selected Payment Instrument ID Reducer', () => {
  test('clears instrument id', () => {
    expect(selectedPaymentInstrumentId(null, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toBe(null);
  });

  test('returns the default state when the cart is saved', () => {
    expect(selectedPaymentInstrumentId({}, {
      type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
    })).toBe(null);
  });

  test('does not respond to foreign events', () => {
    expect(selectedPaymentInstrumentId(1, {
      type: 'foreign'
    })).toEqual(1);
  });
});

describe('savedCompletedDecisions Reducer', () => {
  const EMPTY_IMMUTABLE_OBJECT = Immutable({});
  test('returns the default state when a shopping cart is cleared', () => {
    expect(savedCompletedDecisions({}, {
      type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
    })).toEqual(EMPTY_IMMUTABLE_OBJECT);
  });

  test('sets current offer id to the active offer specified', () => {
    expect(savedCompletedDecisions(undefined, {
      type: OrderFlowTypes.SAVE_COMPLETED_DECISIONS,
      payload: {
        offerInstanceId: 'offer1',
        completedDecisions: [1, 2, 3, 4, 5]
      }
    })).toEqual({
      offer1: [1, 2, 3, 4, 5]
    });
  });
});
