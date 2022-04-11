import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const SearchTransactionsTypes = {
  SEARCH_TRANSACTIONS: CreateAsyncFromString('SEARCH_TRANSACTIONS'),
  RETRIEVE_TRANSACTION: CreateAsyncFromString('RETRIEVE_TRANSACTION')
};

export const SearchTransactions = ({ page, pageSize, paymentInstrumentId, startDate }) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SearchTransactionsTypes.SEARCH_TRANSACTIONS, {
      url: 'Subscriber/SearchTransactions'
    }, {
      PageNumber: page,
      PageSize: pageSize,
      PaymentInstrumentId: paymentInstrumentId || null,
      Start: startDate,
      SortDirection: 2
    });
  };
};

export const RetrieveTransaction = (transactionId) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SearchTransactionsTypes.RETRIEVE_TRANSACTION, {
      url: 'Subscriber/RetrieveTransaction'
    }, {
      IncludePurchaseInformationThumbnails: true,
      ReturnReceiptData: false,
      ReturnTransactionRetryIndicator: false,
      TransactionId: transactionId
    });
  };
};
