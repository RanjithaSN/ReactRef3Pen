import { OrderingTypes } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { SavedCartTypes } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = Immutable({});

export default (state = INITIAL_STATE, { payload = {}, type }) => {
  switch (type) {
  case OrderingTypes.UPDATE_OFFERING_CONTEXT.SUCCESS:
  case OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS: {
    const inventoryIds = (payload.Context.PhysicalInventoryDecisions || []).map((physicalInventoryDecision) => {
      return physicalInventoryDecision.InventoryType.Id;
    });
    return Object.keys(state).reduce((acc, decisionId) => {
      const decision = state[decisionId];
      if (inventoryIds.includes(decision.inventoryTypeId)) {
        return acc;
      }
      return acc.without(decisionId);
    }, state);
  }
  case OrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return INITIAL_STATE;
  default:
    return state;
  }
};
