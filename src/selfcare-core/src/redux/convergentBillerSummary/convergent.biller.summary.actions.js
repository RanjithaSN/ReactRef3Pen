import { ACCESSED_SUBSCRIBER_ID_HEADER } from '../../constants/subscriber';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const ConvergentBillerSummaryActionTypes = {
  CLEAR_CONVERGENT_BILLER_ACCOUNT: 'CLEAR_CONVERGENT_BILLER_ACCOUNT',
  RETRIEVE_CONVERGENT_BILLER_SUMMARY: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_SUMMARY'),
  RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_SUBSCRIBER_ACCOUNTS')
};

export const RetrieveConvergentBillerSummary = (subscriberId, type = ConvergentBillerSummaryActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY) => {
  return (dispatch, getState) => {
    const headers = {};
    if (subscriberId) {
      headers[ACCESSED_SUBSCRIBER_ID_HEADER] = subscriberId;
    }
    return apiThunkHelper(dispatch, getState(), type, {
      method: 'post',
      url: 'subscriber/RetrieveConvergentBillerSubscriberSummary',
      headers
    }, {});
  };
};

export const ClearConvergentBillerAccounts = () => ({
  type: ConvergentBillerSummaryActionTypes.CLEAR_CONVERGENT_BILLER_ACCOUNT
});
