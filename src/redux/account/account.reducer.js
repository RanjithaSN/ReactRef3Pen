import * as LocalStorageHelper from '@selfcare/core/helpers/storage/local.storage';
import { ACCOUNT_CHANGED } from '@selfcare/core/redux/account/account.action.constants';
import { ConvergentBillerSummaryActionTypes } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import { CURRENT_ACCOUNT } from '@selfcare/core/redux/utils/api.constants';
import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import { AccountTypes } from './account.actions';

export const INITIAL_STATE = new Immutable({
  defaultManagedAccount: null,
  defaultUserAccount: null,
  currentAccount: LocalStorageHelper.read(CURRENT_ACCOUNT),
  isRetrieveSubscriberAndAccountsLoading: false
});

export default function SiteReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ACCOUNT_CHANGED:
    return state.set('currentAccount', payload.id);
  case ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY.SUCCESS: {
    const userAccount = pathOr(null, ['SubscriberSummary', 'AccountSummaries', 0, 'AccountNumber'], payload);
    return state.set('defaultUserAccount', userAccount)
      .set('currentAccount', state.currentAccount || state.defaultManagedAccount || userAccount);
  }
  case ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS.SUCCESS: {
    const managedAccount = pathOr(null, ['SubscriberAccounts', 0, 'Accounts', 0, 'AccountNumber'], payload);
    return state.set('defaultManagedAccount', managedAccount)
      .set('currentAccount', state.currentAccount || managedAccount);
  }
  case AccountTypes.SetRetrieveSubscriberAndAccountsLoaded:
    return state.set('isRetrieveSubscriberAndAccountsLoaded', payload);
  default:
    return state;
  }
}
