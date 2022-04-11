import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './search.transactions.reducer';
import * as selectors from './search.transactions.selectors';

const basePath = ['ascendon', 'subscriberApi', 'searchTransactions'];
const initState = new Immutable({
  ascendon: {
    subscriberApi: {
      searchTransactions: INITIAL_STATE
    }
  }
});

describe('SearchTransactions ', () => {
  describe('Transactions', () => {
    test('It should return an empty list if undefined.', () => {
      const state = initState.setIn([...basePath, 'transactions'], null);
      expect(selectors.Transactions(state)).toEqual([]);
    });

    test('It should return the list of transactions when populated.', () => {
      const transactions = [{
        transactionNumber: '1234'
      }];
      const state = initState.setIn([...basePath, 'transactions'], transactions);
      expect(selectors.Transactions(state)).toEqual(transactions);
    });
  });

  describe('IsLoadingTransactions', () => {
    test('It should return false if undefined.', () => {
      const state = initState.setIn([...basePath, 'isLoading'], null);
      expect(selectors.IsLoadingTransactions(state)).toBe(false);
    });

    test('It should return the value of isLoading.', () => {
      const state = initState.setIn([...basePath, 'isLoading'], true);
      expect(selectors.IsLoadingTransactions(state)).toBe(true);
    });
  });

  describe('PageData', () => {
    test('It should return properties related to pagination.', () => {
      const state = initState
        .setIn([...basePath, 'pageCount'], 1)
        .setIn([...basePath, 'recordCount'], 10);
      expect(selectors.PageData(state)).toEqual({
        pageCount: 1,
        recordCount: 10
      });
    });
  });
});
