import { ACCESSED_SUBSCRIBER_ID_HEADER } from '../../constants/subscriber';
import { RetrieveConvergentBillerInvoices } from '../convergentBillerInvoices/convergent.biller.invoices.actions';
import { ConvergentBillerAreInvoicesAvailable, MostRecentConvergentBillerInvoice } from '../convergentBillerInvoices/convergent.biller.invoices.selectors';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const ConvergentBillerInvoiceTypes = {
  RetrieveConvergentBillerInvoice: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_INVOICE')
};

export const RetrieveConvergentBillerInvoice = (invoiceId, issueDate, subscriberId) => {
  return (dispatch, getState) => {
    const headers = {};
    if (subscriberId) {
      headers[ACCESSED_SUBSCRIBER_ID_HEADER] = subscriberId;
    }
    return apiThunkHelper(dispatch, getState(), ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice, {
      method: 'post',
      url: 'subscriber/RetrieveConvergentBillerInvoice',
      headers
    }, {
      InvoiceId: invoiceId,
      IssueDate: issueDate
    });
  };
};

export const RetrieveMostRecentConvergentBillerInvoice = (subscriberId) => {
  return async (dispatch, getState) => {
    if (!ConvergentBillerAreInvoicesAvailable(getState())) {
      dispatch({
        type: ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.BEGIN
      });

      await dispatch(RetrieveConvergentBillerInvoices(subscriberId));
    }

    const invoice = MostRecentConvergentBillerInvoice(getState());

    if (invoice) {
      await dispatch(RetrieveConvergentBillerInvoice(invoice.InvoiceId, invoice.IssueDate, subscriberId));
    }
  };
};
