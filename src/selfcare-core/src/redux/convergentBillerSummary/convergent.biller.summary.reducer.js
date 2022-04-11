import indexBy from 'ramda/src/indexBy';
import prop from 'ramda/src/prop';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SessionActionTypes } from '../session/session.actions';
import { ConvergentBillerSummaryActionTypes } from './convergent.biller.summary.actions';

export const SUMMARY_INITIAL_STATE = new Immutable({
  data: null,
  isLoading: false,
  accountsNeedRefreshed: false
});

export const summary = (state = SUMMARY_INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.BEGIN:
    return state
      .set('isLoading', true);
  case ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS:
    return state
      .set('isLoading', false)
      .set('data', payload.SubscriberSummary);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  case ConvergentBillerSummaryActionTypes.CLEAR_CONVERGENT_BILLER_ACCOUNT:
    return state.set('accountsNeedRefreshed', true);
  case SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.BEGIN:
    return SUMMARY_INITIAL_STATE;
  default:
    return state;
  }
};

export const MANAGED_INITIAL_STATE = new Immutable({
  data: {},
  isLoading: false
});

export const managedAccounts = (state = MANAGED_INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.BEGIN:
    return state.set('isLoading', true);
  case ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS:
    return state
      .set('isLoading', false)
      .set('data', payload.SubscriberAccounts ? indexBy(prop('SubscriberId'), payload.SubscriberAccounts) : null);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  case SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.BEGIN:
    return MANAGED_INITIAL_STATE;
  default:
    return state;
  }
};

export default combineReducers({
  managedAccounts,
  summary
});
