import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import Immutable from 'seamless-immutable';
import { ACCOUNT_CHANGED } from '../account/account.action.constants';
import { FaultTypes } from '../fault/fault.actions';
import { ConvergentBillerAccountUsageDetailsTypes } from './convergent.biller.account.usage.details.actions';

export const INITIAL_STATE = new Immutable({
  allProductsUsageIsLoading: false,
  entitlementBalances: null,
  status: {},
  usageItems: null
});

export default function ConvergentBillerBillCycleDetailsReducer(state = INITIAL_STATE, { payload = {}, requestObject, type }) {
  switch (type) {
  case ACCOUNT_CHANGED:
    return INITIAL_STATE;
  case ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.BEGIN:
    return state
      .set('entitlementBalances', null)
      .setIn(['usageItems', requestObject.ServiceIdentifier.Value], null)
      .setIn(['status', requestObject.ServiceIdentifier.Value], LOADING_STATUS.LOADING);
  case ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.SUCCESS:
    return state
      .set('entitlementBalances', payload.EntitlementBalances)
      .setIn(['usageItems', requestObject.ServiceIdentifier.Value], payload.UsageItems)
      .setIn(['status', requestObject.ServiceIdentifier.Value], LOADING_STATUS.LOADED);
  case ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS.BEGIN:
    return state.set('allProductsUsageIsLoading', true);
  case ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS.SUCCESS:
    return state.set('allProductsUsageIsLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS.BEGIN:
      return state.setIn(['status', requestObject.ServiceIdentifier.Value], LOADING_STATUS.UNLOADED);
    default:
      return state;
    }
  default:
    return state;
  }
}
