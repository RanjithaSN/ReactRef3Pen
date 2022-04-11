import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SearchTransactionsTypes } from './search.transactions.actions';

export const INITIAL_STATE = new Immutable({
  transactions: null,
  transactionDetails: null,
  isLoading: false,
  pageCount: 0,
  recordCount: 0
});

export default function PaymentHistoryReducer(state = INITIAL_STATE, { payload = {}, requestObject = {}, type }) {
  switch (type) {
  case SearchTransactionsTypes.SEARCH_TRANSACTIONS.BEGIN:
  case SearchTransactionsTypes.RETRIEVE_TRANSACTION.BEGIN:
    return state.set('isLoading', true);
  case SearchTransactionsTypes.SEARCH_TRANSACTIONS.SUCCESS:
    return state.merge({
      isLoading: false,
      transactions: requestObject.PageNumber === 1 ? payload.Items : pathOr([], ['transactions'], state).concat(payload.Items),
      pageCount: payload.PageCount,
      recordCount: payload.RecordCount || 0
    });
  case SearchTransactionsTypes.RETRIEVE_TRANSACTION.SUCCESS:
    return state.merge({
      isLoading: false,
      transactionDetails: pathOr([], ['transactionDetails'], state).concat(payload)
    });
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SearchTransactionsTypes.SEARCH_TRANSACTIONS.BEGIN:
    case SearchTransactionsTypes.RETRIEVE_TRANSACTION.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
