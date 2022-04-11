import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import LoadingStatus from '../../constants/loading.status';
import { OrderingTypes } from '../offeringContext/offering.context.actions';

export const INITIAL_STATE = new Immutable({
  availability: {},
  availabilityLoading: {},
  isSendingShoppingCartToStore: false,
  shoppingCartSentToStore: false,
  storeOrder: null,
  storeOrderStatus: LoadingStatus.UNLOADED
});

export default (state = INITIAL_STATE, { payload = {}, type }) => {
  switch (type) {
  case OrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS:
  case OrderingTypes.UPDATE_OFFERING_CONTEXT.SUCCESS:
  case OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS: {
    const decisionIds = pathOr([], ['Context', 'PhysicalInventoryDecisions'], payload).map(({ Id }) => Id);
    return Object.keys(state.availability).reduce((acc, decisionId) => {
      if (decisionIds.includes(decisionId)) {
        return acc;
      }
      return acc.setIn(['availability', decisionId], null);
    }, state);
  }
  default:
    return state;
  }
};
