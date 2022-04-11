import LoadingStatus from '../../constants/loading.status';
import { FaultTypes } from '../fault/fault.actions';
import { SavedCartTypes } from './saved.cart.actions';
import reducer, { INITIAL_STATE } from './saved.cart.reducer';

describe('Cart Reducer', () => {
  describe('SavedCartTypes.SAVE_OFFERING_CART.SUCCESS', () => {
    let state;

    beforeEach(() => {
      const initState = INITIAL_STATE
        .set('savedCartStatus', LoadingStatus.UPDATING);

      state = reducer(initState, {
        type: SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
      });
    });

    test('it should set savedCartStatus to LOADED', () => {
      expect(state.savedCartStatus).toBe(LoadingStatus.UPDATED);
    });
  });

  describe('SavedCartTypes.RETRIEVE_SAVED_CART.BEGIN', () => {
    let state;
    beforeEach(() => {
      state = reducer(
        INITIAL_STATE,
        {
          type: SavedCartTypes.RETRIEVE_SAVED_CART.BEGIN
        }
      );
    });

    test('it should set saved cart status to LOADING', () => {
      expect(state.savedCartStatus).toBe(LoadingStatus.LOADING);
    });
  });

  describe('SavedCartTypes.RETRIEVE_SAVED_CART.SUCCESS', () => {
    let state;
    const payload = {
      ShoppingCart: {
        Items: [{}]
      }
    };

    beforeEach(() => {
      state = reducer(
        INITIAL_STATE.set('savedCartStatus', LoadingStatus.LOADING),
        {
          type: SavedCartTypes.RETRIEVE_SAVED_CART.SUCCESS,
          payload
        }
      );
    });

    test('it should set saved cart status to LOADED', () => {
      expect(state.savedCartStatus).toBe(LoadingStatus.LOADED);
    });

    test('it should store the saved cart', () => {
      expect(state.data).toEqual(payload);
    });
  });

  describe('SavedCartTypes.CLEAR_SAVED_CART.BEGIN', () => {
    test('it should set the clearing flag', () => {
      const state = reducer(
        INITIAL_STATE,
        {
          type: SavedCartTypes.CLEAR_SAVED_CART.BEGIN
        }
      );
      expect(state.isClearingSavedCart).toBe(true);
    });
  });

  describe('SavedCartTypes.CLEAR_SAVED_CART.SUCCESS', () => {
    let state;

    beforeEach(() => {
      const initState = INITIAL_STATE
        .set('isClearingSavedCart', true)
        .set('savedCartStatus', LoadingStatus.LOADED)
        .set('data', {});
      state = reducer(
        initState,
        {
          type: SavedCartTypes.CLEAR_SAVED_CART.SUCCESS
        }
      );
    });

    test('it should clear the clearing flag', () => {
      expect(state.isClearingSavedCart).toBe(false);
    });

    test('it should reset savedCartStatus', () => {
      expect(state.savedCartStatus).toBe(LoadingStatus.UNLOADED);
    });

    test('it should clear data', () => {
      expect(state.data).toBe(null);
    });
  });

  describe('API Fault', () => {
    test('It should set saved cart status to UNLOADED for RETRIEVE_SAVED_CART.BEGIN', () => {
      const state = reducer(
        INITIAL_STATE.set('savedCartStatus', LoadingStatus.LOADING),
        {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: SavedCartTypes.RETRIEVE_SAVED_CART.BEGIN
          }
        }
      );
      expect(state.savedCartStatus).toBe(LoadingStatus.UNLOADED);
    });

    test('It should clear the clearing flag for CLEAR_SAVED_CART.BEGIN', () => {
      const state = reducer(
        INITIAL_STATE.set('isClearingSavedCart', true),
        {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: SavedCartTypes.CLEAR_SAVED_CART.BEGIN
          }
        }
      );
      expect(state.isClearingSavedCart).toBe(false);
    });

    test('It should not respond to foreign triggers', () => {
      const state = reducer(
        INITIAL_STATE.set('isClearingSavedCart', true),
        {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: 'nope'
          }
        }
      );
      expect(state.isClearingSavedCart).toBe(true);
    });
  });

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });
});
