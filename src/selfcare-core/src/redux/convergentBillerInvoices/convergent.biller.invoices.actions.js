import { ACCESSED_SUBSCRIBER_ID_HEADER } from '../../constants/subscriber';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const ConvergentBillerInvoicesTypes = {
  RetrieveConvergentBillerInvoices: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_INVOICES')
};

export const RetrieveConvergentBillerInvoices = (subscriberId) => {
  return (dispatch, getState) => {
    const headers = {};
    if (subscriberId) {
      headers[ACCESSED_SUBSCRIBER_ID_HEADER] = subscriberId;
    }
    return apiThunkHelper(dispatch, getState(), ConvergentBillerInvoicesTypes.RetrieveConvergentBillerInvoices, {
      method: 'post',
      url: 'subscriber/RetrieveConvergentBillerInvoices',
      headers
    }, {});
  };
};
