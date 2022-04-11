import Immutable from 'seamless-immutable';
import LOADING_STATUS from '../../../constants/loading.status';
import { FaultTypes } from '../../fault/fault.actions';
import { CodeActions } from './codes.actions';

export const INITIAL_STATE = new Immutable({});

export default function(state = INITIAL_STATE, { type, payload, requestObject }) {
  switch (type) {
  case CodeActions.BEGIN:
    return state
      .set(requestObject.codeType, {
        status: LOADING_STATUS.LOADING,
        items: []
      });
  case CodeActions.SUCCESS:
    return state.set(requestObject.codeType, {
      status: LOADING_STATUS.LOADED,
      items: payload.Codes
    });
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case CodeActions.BEGIN:
      return state.setIn([requestObject.codeType, 'status'], LOADING_STATUS.UNLOADED);
    default:
      return state;
    }
  default:
    return state;
  }
}
