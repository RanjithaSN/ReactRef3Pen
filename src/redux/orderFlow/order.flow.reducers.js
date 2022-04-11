import { QuoteTypes } from '@selfcare/core/redux/quote/quote.actions';
import { SavedCartTypes } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { attributeDecisionInfo, attributePresentAndValid, attributesByDecision } from './attributes/attributes.order.flow.reducer';
import { OrderFlowTypes } from './order.flow.actions';
import { OFFER_STATE } from './order.flow.constants';
import { getDecisionPages, getDecisions } from './order.flow.selectors.api';
import physicalInventory from './physicalInventory/physical.inventory.reducer';

const EMPTY_IMMUTABLE_OBJECT = Immutable({});
export const toggleSingleDecisionGroupOption = (decision, optionId) => (
  decision.set('Options', decision.Options.map((option) => {
    if (option.Id === optionId) {
      return option
        .set('Quantity', option.MinimumQuantity === 0 && option.Quantity === 1 ? 0 : 1)
        .set('Selected', !option.Selected);
    }

    return option
      .set('Selected', false)
      .set('Quantity', 0);
  }))
);

export const updateDecisionGroupOptionQuantity = (decision, optionId, quantity) => (
  decision.set('Options', decision.Options.map((option) => {
    if (option.Id === optionId) {
      return option
        .set('Selected', quantity > 0)
        .set('Quantity', quantity);
    }
    return option;
  }))
);

export const updateQuantityDecision = (decision, optionId, quantity, planSwap) => (
  decision.set('Options', decision.Options.map((option) => {
    if (option.Id === optionId) {
      return option.set('Quantity', quantity)
        .set('IsPlanOrServiceSwap', planSwap);
    }

    return option;
  }))
);

export const updateOptionItemQuantity = (decision, optionId, itemId, quantity) => (
  decision.set('Options', decision.Options.map((option) => {
    if (option.Id === optionId) {
      return option.set('Items', option.Items.map((item) => {
        if (item.DecisionGroupOptionItemId === itemId) {
          return item.set('Quantity', quantity);
        }

        return item;
      }));
    }

    return option;
  }))
);

export const decisionsById = (state = EMPTY_IMMUTABLE_OBJECT, { payload, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return EMPTY_IMMUTABLE_OBJECT;
  case OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT: {
    const result = getDecisions(payload).reduce((byId, decision) => {
      return {
        ...byId,
        [decision.Id]: decision
      };
    }, {});

    return Immutable(result);
  }
  case OrderFlowTypes.UPDATE_QUANTITY_DECISION: {
    const { decisionId, optionId, quantity, planSwap } = payload;

    return state.set(
      decisionId,
      updateQuantityDecision(state[decisionId], optionId, quantity, planSwap)
    );
  }
  case OrderFlowTypes.SET_DECISION_GROUP_OPTION_SELECTION:
  case OrderFlowTypes.TOGGLE_DECISION_GROUP_OPTION_SELECTION: {
    const { decisionId, optionId } = payload;

    return state.set(
      decisionId,
      toggleSingleDecisionGroupOption(state[decisionId], optionId)
    );
  }
  case OrderFlowTypes.UPDATE_DECISION_GROUP_QUANTITY: {
    const { decisionId, optionId, quantity } = payload;

    return state.set(
      decisionId,
      updateDecisionGroupOptionQuantity(state[decisionId], optionId, quantity)
    );
  }
  case OrderFlowTypes.UPDATE_OPTION_ITEM_QUANTITY: {
    const { decisionId, optionId, itemId, quantity } = payload;

    return state.set(
      decisionId,
      updateOptionItemQuantity(state[decisionId], optionId, itemId, quantity)
    );
  }
  default:
    return state;
  }
};

export const decisionsByPage = (state = EMPTY_IMMUTABLE_OBJECT, { payload, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return EMPTY_IMMUTABLE_OBJECT;
  case OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT: {
    const result = getDecisionPages(payload).reduce((byPage, { Id: pageId }) => {
      return {
        ...byPage,
        [pageId]: getDecisions(payload).filter(({ PageId }) => PageId === pageId).map(({ Id }) => Id)
      };
    }, {});

    return Immutable(result);
  }
  default:
    return state;
  }
};

export const decisionPages = (state = Immutable([]), { payload, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return Immutable([]);
  case OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT:
    return Immutable(
      [...getDecisionPages(payload)].sort((a, b) => a.PageNumber > b.PageNumber)
    );
  default:
    return state;
  }
};

export const currentDecisionPageIndex = (state = null, { payload, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return null;
  case OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT:
    return 0; // Offers always have at least one page of decisions
  case OrderFlowTypes.NAVIGATE_TO_DECISION_PAGE:
    return payload;
  default:
    return state;
  }
};

export const completedOfferingCart = (state = null, { payload, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT:
  case SavedCartTypes.SAVE_PRODUCT_CART.SUCCESS:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return null;
  case OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT: {
    return payload.ShoppingCart;
  }
  default:
    return state;
  }
};

export const selectedPaymentInstrumentId = (state = null, { type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case SavedCartTypes.SAVE_PRODUCT_CART.SUCCESS:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return null;
  default:
    return state;
  }
};

export const activeOfferId = (state = null, { payload, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT:
  case SavedCartTypes.SAVE_PRODUCT_CART.SUCCESS:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return null;
  case OrderFlowTypes.SET_ACTIVE_OFFER_IDS:
    return payload.offerId;
  default:
    return state;
  }
};

export const activeOfferInstanceId = (state = null, { payload, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT:
  case SavedCartTypes.SAVE_PRODUCT_CART.SUCCESS:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return null;
  case OrderFlowTypes.SET_ACTIVE_OFFER_IDS:
    return payload.offerInstanceId;
  default:
    return state;
  }
};

export const offerStateByInstanceId = (state = EMPTY_IMMUTABLE_OBJECT, { payload, type }) => {
  switch (type) {
  case OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT:
    return state.setIn([payload.offerInstanceId], OFFER_STATE.UNACTIVE);
  case OrderFlowTypes.SET_ACTIVE_OFFER_IDS:
    return state.setIn([payload.offerInstanceId], OFFER_STATE.ACTIVE);
  case OrderFlowTypes.SET_OFFER_AS_CONFIGURED:
    return state.setIn([payload.offerInstanceId], OFFER_STATE.CONFIGURED);
  case QuoteTypes.CLEAR_ORDER_QUOTE:
    return EMPTY_IMMUTABLE_OBJECT;
  default:
    return state;
  }
};

export const savedCompletedDecisions = (state = EMPTY_IMMUTABLE_OBJECT, { payload, type }) => {
  switch (type) {
  case OrderFlowTypes.SAVE_COMPLETED_DECISIONS:
    return state.setIn([payload.offerInstanceId], payload.completedDecisions);
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
    return EMPTY_IMMUTABLE_OBJECT;
  default:
    return state;
  }
};

export default combineReducers({
  activeOfferId,
  activeOfferInstanceId,
  attributeDecisionInfo,
  attributePresentAndValid,
  attributesByDecision,
  completedOfferingCart,
  currentDecisionPageIndex,
  decisionsById,
  decisionsByPage,
  decisionPages,
  physicalInventory,
  offerStateByInstanceId,
  savedCompletedDecisions,
  selectedPaymentInstrumentId
});
