import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { SessionActionTypes } from '@selfcare/core/redux/session/session.actions';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { ConvergentBillerActionTypes } from './convergent.biller.actions';

export const MANAGED_ACCOUNTS_INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false
});

export const managedAccount = (state = MANAGED_ACCOUNTS_INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS.BEGIN:
    return state.set('isLoading', true);
  case ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS.SUCCESS:
    return state
      .set('isLoading', false)
      .setIn(['data', payload.SubscriberSummary.SubscriberId], payload.SubscriberSummary);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  case SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.BEGIN:
    return MANAGED_ACCOUNTS_INITIAL_STATE;
  default:
    return state;
  }
};

export default combineReducers({
  managedAccount
});
