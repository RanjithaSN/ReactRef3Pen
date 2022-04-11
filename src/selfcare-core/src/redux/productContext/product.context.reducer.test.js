import Immutable from 'seamless-immutable';
import LoadingStatus from '../../constants/loading.status';
import { FaultTypes } from '../fault/fault.actions';
import { ProductOrderingTypes } from './product.context.actions';
import reducer from './product.context.reducer';

const INITIAL_STATE = new Immutable({});
const TEST_PRODUCT_ID = 12;
const TEST_STATE = new Immutable({
  11: {
    status: LoadingStatus.UNLOADED,
    data: {}
  },
  14: {
    status: LoadingStatus.LOADING
  }
});
const TEST_STATE_WITH_LOADING = TEST_STATE.set(TEST_PRODUCT_ID, {
  status: LoadingStatus.LOADING
});


describe('Product Context Reducer', () => {
  describe('default state', () => {
    it('should return initial state on init', () => {
      const state = reducer(undefined, {});
      expect(INITIAL_STATE).toEqual(state);
    });
  });

  describe('When "Retrieve Product Context" action is made status should be set to loading', () => {
    it('when state is empty', () => {
      const action = {
        payload: {},
        type: ProductOrderingTypes.RetrieveSingleProductContext.BEGIN,
        requestObject: {
          ProductId: TEST_PRODUCT_ID
        }
      };
      const state = reducer(INITIAL_STATE, action);
      expect(state[TEST_PRODUCT_ID].status).toBe(LoadingStatus.LOADING);
    });

    it('when state has other product contexts stored', () => {
      const action = {
        payload: {},
        type: ProductOrderingTypes.RetrieveSingleProductContext.BEGIN,
        requestObject: {
          ProductId: TEST_PRODUCT_ID
        }
      };
      const state = reducer(TEST_STATE, action);
      expect(state[TEST_PRODUCT_ID].status).toBe(LoadingStatus.LOADING);
      expect(state).toEqual(TEST_STATE_WITH_LOADING);
    });
  });

  describe('When "Retrieve Product Context" action is successful', () => {
    it('should add payload to the data', () => {
      const payload = {
        MyTest: {}
      };

      const action = {
        payload,
        type: ProductOrderingTypes.RetrieveSingleProductContext.SUCCESS,
        requestObject: {
          ProductId: TEST_PRODUCT_ID
        }
      };

      const state = reducer(TEST_STATE_WITH_LOADING, action);

      expect(state[TEST_PRODUCT_ID].status).toBe(LoadingStatus.LOADED);
      expect(state[TEST_PRODUCT_ID].data).toEqual(payload);
    });
  });

  describe('API Fault', () => {
    test('It should clear the status for RetrieveSingleProductContext BEGIN', () => {
      const state = reducer(
        TEST_STATE_WITH_LOADING,
        {
          payload: {
            trigger: ProductOrderingTypes.RetrieveSingleProductContext.BEGIN
          },
          type: FaultTypes.API_FAULT,
          requestObject: {
            ProductId: TEST_PRODUCT_ID
          }
        }
      );
      expect(state[TEST_PRODUCT_ID].status).toBe(LoadingStatus.UNLOADED);
    });
  });

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(TEST_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(TEST_STATE);
    });
  });
});
