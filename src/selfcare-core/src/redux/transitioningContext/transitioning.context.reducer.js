import Immutable from 'seamless-immutable';
import LOADING_STATUS from '../../constants/loading.status';
import { FaultTypes } from '../fault/fault.actions';
import { TransitioningContextTypes } from './transitioning.context.actions';

export const INITIAL_STATE = new Immutable({
  data: {},
  transitioningStatus: LOADING_STATUS.UNLOADED
});

export default function TransitioningContextReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case TransitioningContextTypes.RETRIEVE_TRANSITIONING_CONTEXT.BEGIN:
    return state.setIn(['transitioningStatus'], LOADING_STATUS.LOADING);
  case TransitioningContextTypes.RETRIEVE_TRANSITIONING_CONTEXT.SUCCESS:
    return state
      .setIn(['transitioningStatus'], LOADING_STATUS.LOADED)
      .setIn(['data'], payload);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case TransitioningContextTypes.RETRIEVE_TRANSITIONING_CONTEXT.BEGIN:
      return state.setIn(['transitioningStatus'], LOADING_STATUS.UNLOADED);
    default:
      return state;
    }
  default:
    return state;
  }
}
