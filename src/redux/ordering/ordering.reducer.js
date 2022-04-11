import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { OrderingTypes as OfferingContext } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import Immutable from 'seamless-immutable';
import { OrderingTypes } from './ordering.actions';
import { getPrimaryDecision, getPrimaryDecisionAndZeroQuantity } from './ordering.helpers';

export const INITIAL_STATE = new Immutable({
  data: {
    dataByInstanceId: {},
    statusesByInstanceId: {},
    decisionBeingModified: null,
    isCalculatingDecisionBeingModified: false,
    isolatedRetrieval: false,
    isInBundleOrderFlow: false
  }
});

export default function OrderingReducer(state = INITIAL_STATE, { payload = {}, type, requestObject: { offeringInstanceId } = {} }) {
  switch (type) {
  case OfferingContext.RETRIEVE_OFFERING_CONTEXT.BEGIN:
    return state.setIn(['data', 'statusesByInstanceId', offeringInstanceId], LOADING_STATUS.LOADING);
  case OfferingContext.RETRIEVE_OFFERING_CONTEXT.SUCCESS:
    return state
      .setIn(['data', 'statusesByInstanceId', offeringInstanceId], LOADING_STATUS.LOADED)
      .setIn(['data', 'dataByInstanceId', offeringInstanceId], getPrimaryDecisionAndZeroQuantity(payload));
  case OfferingContext.RETRIEVE_OFFERING_CONTEXT_MODIFY.BEGIN:
    return state.setIn(['data', 'statusesByInstanceId', offeringInstanceId], LOADING_STATUS.LOADING);
  case OfferingContext.RETRIEVE_OFFERING_CONTEXT_MODIFY.SUCCESS:
    return state
      .setIn(['data', 'statusesByInstanceId', offeringInstanceId], LOADING_STATUS.LOADED)
      .setIn(['data', 'dataByInstanceId', offeringInstanceId], getPrimaryDecision(payload));
  case OrderingTypes.DECISION_BEING_MODIFIED:
    return state
      .setIn(['data', 'decisionBeingModified'], payload);
  case OrderingTypes.CALCULATING_DECISION_BEING_MODIFIED:
    return state.setIn(['data', 'isCalculatingDecisionBeingModified'], payload);
  case OrderingTypes.SETTING_ISOLATED_RETRIEVAL:
    return state.setIn(['data', 'isolatedRetrieval'], true);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case OfferingContext.RETRIEVE_OFFERING_CONTEXT.BEGIN:
      return state.setIn(['data', 'statusesByInstanceId', offeringInstanceId], LOADING_STATUS.UNLOADED);
    default:
      return state;
    }
  case OrderingTypes.CLEAR_MODIFIED_DECISION_DATA:
    return state.setIn(['data', 'decisionBeingModified'], INITIAL_STATE.data.decisionBeingModified);
  case OrderingTypes.SET_IS_IN_BUNDLE_ORDER_FLOW:
    return state.setIn(['data', 'isInBundleOrderFlow'], payload);
  case OrderingTypes.SET_IS_EXISTING_USER:
    return state.setIn(['data', 'isExistingUser'], payload);
  default:
    return state;
  }
}
