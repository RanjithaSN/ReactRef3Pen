import { FaultTypes } from '../fault/fault.actions';
import { SearchTransactionsTypes as types } from './search.transactions.actions';
import reducer, { INITIAL_STATE } from './search.transactions.reducer';

describe('SearchTransactions Reducer', () => {
  describe('When SearchTransactionsTypes.SEARCH_TRANSACTIONS.BEGIN is dispatched', () => {
    test('It should set isLoading to true.', () => {
      const state = reducer(INITIAL_STATE, {
        type: types.SEARCH_TRANSACTIONS.BEGIN
      });
      expect(state.isLoading).toBe(true);
    });
  });

  describe('When SearchTransactionsTypes.SEARCH_TRANSACTIONS.SUCCESS is dispatched', () => {
    const payload = {
      Items: [{
        TransactionNumber: '1234'
      }],
      PageCount: 1,
      RecordCount: 10
    };
    let state;

    beforeEach(() => {
      state = reducer(
        INITIAL_STATE.set('isLoading', true),
        {
          type: types.SEARCH_TRANSACTIONS.SUCCESS,
          payload
        }
      );
    });

    test('It should set isLoading to false.', () => {
      expect(state.isLoading).toBe(false);
    });

    test('It should set the transactions list.', () => {
      expect(state.transactions).toEqual(payload.Items);
    });

    test('It should set the pagination data.', () => {
      expect(state.pageCount).toBe(payload.PageCount);
      expect(state.recordCount).toBe(payload.RecordCount);
    });
  });

  describe('When SearchTransactionsTypes.SEARCH_TRANSACTIONS.SUCCESS is dispatched v2', () => {
    const payload = {
      Items: [{
        TransactionNumber: '1234'
      }],
      PageCount: 1,
      RecordCount: 10
    };
    let state;

    test('It should append transactions if page number from the request is not 1.', () => {
      state = reducer(
        INITIAL_STATE.set('transactions', ['4567']),
        {
          type: types.SEARCH_TRANSACTIONS.SUCCESS,
          payload,
          requestObject: {
            PageNumber: 2
          }
        }
      );
      expect(state.transactions.length).toBe(2);
    });

    test('It should override the transaction if page is 1.', () => {
      state = reducer(
        INITIAL_STATE.set('transactions', ['4567']),
        {
          type: types.SEARCH_TRANSACTIONS.SUCCESS,
          payload,
          requestObject: {
            PageNumber: 1
          }
        }
      );
      expect(state.transactions.length).toBe(1);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched', () => {
    describe('When the trigger is SearchTransactionsTypes.SEARCH_TRANSACTIONS.BEGIN', () => {
      test('It should set isLoading to false.', () => {
        const state = reducer(
          INITIAL_STATE.set('isLoading', true),
          {
            type: FaultTypes.API_FAULT,
            payload: {
              trigger: types.SEARCH_TRANSACTIONS.BEGIN
            }
          }
        );
        expect(state.isLoading).toBe(false);
      });
    });
  });
});
