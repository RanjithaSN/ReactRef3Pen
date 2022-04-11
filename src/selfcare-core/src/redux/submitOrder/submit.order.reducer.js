import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SubmitOrderTypes } from './submit.order.actions';

export const INITIAL_STATE = Immutable({
  data: null,
  isSubmittingOrder: false,
  isSubmitOrderLoaded: false
});

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SubmitOrderTypes.CLEAR_ORDER_DATA:
    return INITIAL_STATE;
  case SubmitOrderTypes.PRODUCT_EXPIRATION_RENEW_OPT.BEGIN:
  case SubmitOrderTypes.SUBMIT_ORDER.BEGIN:
  case SubmitOrderTypes.SUBMIT_3DS1_ORDER.BEGIN:
  case SubmitOrderTypes.SUBMIT_3DS1_ORDER_FINAL_REQUEST.BEGIN:
  case SubmitOrderTypes.SUBMIT_PRODUCT_ORDER.BEGIN:
    return state
      .set('isSubmittingOrder', true)
      .set('isSubmitOrderLoaded', false);
  case SubmitOrderTypes.PRODUCT_EXPIRATION_RENEW_OPT.SUCCESS:
    return state
      .set('isSubmitOrderLoaded', true)
      .set('isSubmittingOrder', false);
  case SubmitOrderTypes.SUBMIT_ORDER.SUCCESS:
  case SubmitOrderTypes.SUBMIT_3DS1_ORDER.SUCCESS:
  case SubmitOrderTypes.SUBMIT_3DS1_ORDER_FINAL_REQUEST.SUCCESS:
  case SubmitOrderTypes.SUBMIT_PRODUCT_ORDER.SUCCESS:
    return state
      .set('isSubmitOrderLoaded', true)
      .set('isSubmittingOrder', false)
      .set('data', payload.Order);
  case SubmitOrderTypes.SUBMIT_3DS1_ORDER:
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SubmitOrderTypes.SUBMIT_ORDER.BEGIN:
    case SubmitOrderTypes.SUBMIT_3DS1_ORDER.BEGIN:
    case SubmitOrderTypes.SUBMIT_PRODUCT_ORDER.BEGIN:
    case SubmitOrderTypes.PRODUCT_EXPIRATION_RENEW_OPT.BEGIN:
      return state.set('isSubmittingOrder', false);
    default:
      return state;
    }
  default:
    return state;
  }
};
