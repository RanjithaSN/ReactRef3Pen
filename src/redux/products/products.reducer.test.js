import { ProductTypes } from './products.actions';
import reducer, { INITIAL_STATE } from './products.reducer';

describe('ProductsReducer', () => {
  describe('When UpdateSelectedProduct is dispatched', () => {
    test('It should set the store to the payload entered.', () => {
      const state = reducer(INITIAL_STATE, {
        type: ProductTypes.UpdateSelectedProduct,
        payload: {
          id: 'test'
        }
      });
      expect(state).toEqual(INITIAL_STATE.setIn(['data', 'selectedProductId'], 'test'));
    });
    test('If unrelated action is sent in, state should not change.', () => {
      const state = reducer(INITIAL_STATE, {
        type: 'test',
        payload: {
          id: 'test'
        }
      });
      expect(state).toEqual(INITIAL_STATE);
    });
  });
});
