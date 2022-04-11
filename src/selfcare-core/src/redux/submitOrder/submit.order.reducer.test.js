import { FaultTypes } from '../fault/fault.actions';
import { SubmitOrderTypes } from './submit.order.actions';
import reducer, { INITIAL_STATE } from './submit.order.reducer';

describe('Submit Order Reducer', () => {
  describe('Submit Order default state', () => {
    it('should return initial state on init', () => {
      const state = reducer(undefined, {});
      expect(INITIAL_STATE).toEqual(state);
    });
  });

  describe('When Submit order action is made', () => {
    it('should set isSubmittingOrder is true', () => {
      const action = {
        payload: {},
        type: SubmitOrderTypes.SUBMIT_ORDER.BEGIN
      };
      const state = reducer(INITIAL_STATE, action);
      expect(state.isSubmittingOrder).toBe(true);
      expect(state.isSubmitOrderLoaded).toBe(false);
    });
  });

  describe('When an action to clear the order data is made', () => {
    it('should reset the initial state', () => {
      const action = {
        type: SubmitOrderTypes.CLEAR_ORDER_DATA
      };
      const state = reducer({}, action);
      expect(state).toEqual(INITIAL_STATE);
    });
  });

  describe('When submit order is successful', () => {
    it('should add the new order data and clear isSubmittingOrder', () => {
      const action = {
        payload: {
          Order: {
            OrderNumber: '102306038',
            TotalAmount: 123.45,
            OrderStatusName: 'Pending'
          }
        },
        type: SubmitOrderTypes.SUBMIT_ORDER.SUCCESS
      };
      const state = reducer(INITIAL_STATE.set('isSubmittingOrder', true), action);

      expect(state.data).toEqual(action.payload.Order);
      expect(state.isSubmittingOrder).toBe(false);
      expect(state.isSubmitOrderLoaded).toBe(true);
    });
  });

  describe('API Fault', () => {
    test('It should clear the isSubmittingOrder for SUBMIT_ORDER BEGIN', () => {
      const state = reducer(
        INITIAL_STATE.set('isSubmittingOrder', true),
        {
          payload: {
            trigger: SubmitOrderTypes.SUBMIT_ORDER.BEGIN
          },
          type: FaultTypes.API_FAULT
        }
      );
      expect(state.isSubmittingOrder).toBe(false);
    });

    test('It should return the state passed to the reducer for any other fault.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: 'some other action'
        }
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });

  describe('When Product Expiration Renew Opt begins', () => {
    it('should set isSubmittingOrder is true', () => {
      const action = {
        type: SubmitOrderTypes.PRODUCT_EXPIRATION_RENEW_OPT.BEGIN
      };
      const state = reducer(INITIAL_STATE, action);
      expect(state.isSubmittingOrder).toBe(true);
      expect(state.isSubmitOrderLoaded).toBe(false);
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
