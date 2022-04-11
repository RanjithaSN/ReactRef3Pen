import Immutable from 'seamless-immutable';
import LOADING_STATUS from '../../constants/loading.status';
import { FaultTypes } from '../fault/fault.actions';
import { SavedCartTypes } from '../savedCart/saved.cart.actions';
import { OrderingTypes } from './offering.context.actions';

export const INITIAL_STATE = Immutable({
  dataByInstanceId: {},
  statusesByInstanceId: {},
  attributesById: {}
});

export default (state = INITIAL_STATE, { payload, type, requestObject: { offeringInstanceId } = {} }) => {
  switch (type) {
  case OrderingTypes.RETRIEVE_OFFERING_CONTEXT.BEGIN:
  case OrderingTypes.RETRIEVE_ATTRIBUTES.BEGIN:
    return state.setIn(['statusesByInstanceId', offeringInstanceId], LOADING_STATUS.LOADING);
  case OrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS:
    return state
      .setIn(['statusesByInstanceId', offeringInstanceId], LOADING_STATUS.LOADED)
      .setIn(['dataByInstanceId', offeringInstanceId], payload);
  case OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS:
    return state
      .setIn(['statusesByInstanceId', offeringInstanceId], LOADING_STATUS.LOADED)
      .setIn(['attributesById', offeringInstanceId], payload);
  case OrderingTypes.UPDATE_OFFERING_CONTEXT.BEGIN:
    return state.setIn(['statusesByInstanceId', offeringInstanceId], LOADING_STATUS.UPDATING);
  case OrderingTypes.UPDATE_OFFERING_CONTEXT.SUCCESS:
    return state
      .setIn(['statusesByInstanceId', offeringInstanceId], LOADING_STATUS.UPDATED)
      .setIn(['dataByInstanceId', offeringInstanceId], payload);
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case SavedCartTypes.SAVE_PRODUCT_CART.SUCCESS:
    return INITIAL_STATE;
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case OrderingTypes.RETRIEVE_OFFERING_CONTEXT.BEGIN:
    case OrderingTypes.RETRIEVE_ATTRIBUTES.BEGIN:
      return state.setIn(['statusesByInstanceId', offeringInstanceId], LOADING_STATUS.UNLOADED);
    case OrderingTypes.UPDATE_OFFERING_CONTEXT.BEGIN:
      return state.setIn(['statusesByInstanceId', offeringInstanceId], LOADING_STATUS.UNCOMMITTED);
    default:
      return state;
    }
  default:
    return state;
  }
};
