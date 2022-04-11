import reducer, { INITIAL_STATE } from './quote.reducer';
import { QuoteTypes } from './quote.actions';
import { FaultTypes } from '../fault/fault.actions';

describe('Quote Reducer', () => {
  describe('Quote default state', () => {
    it('should return initial state on init', () => {
      const state = reducer(undefined, {});
      expect(INITIAL_STATE).toEqual(state);
    });
  });

  describe('Quote is cleared', () => {
    it('should return initial state on init', () => {
      const state = reducer({
        test: 'this fake state'
      }, {
        type: QuoteTypes.CLEAR_ORDER_QUOTE
      });
      expect(INITIAL_STATE).toEqual(state);
    });
  });

  describe('When "Calculating Order Quote" action is made', () => {
    it('should set isCalculatingQuote true', () => {
      const action = {
        payload: {},
        type: QuoteTypes.CALCULATE_ORDER_QUOTE.BEGIN
      };
      const state = reducer(INITIAL_STATE, action);
      expect(state.isCalculatingQuote).toBe(true);
      expect(state.data).toEqual(null);
      expect(state.quoteCalculated).toBe(false);
    });
  });

  describe('When "Calculating Order Quote" action is successful', () => {
    it('should add payload to the data', () => {
      const payload = {
        Quote: {
          Totals: {
            SubTotalAmount: 123.32,
            TaxAmount: 28.91,
            TotalAmount: 120.12
          }
        }
      };

      const action = {
        payload,
        type: QuoteTypes.CALCULATE_ORDER_QUOTE.SUCCESS
      };

      const state = reducer(INITIAL_STATE, action);

      expect(state.isCalculatingQuote).toBe(false);
      expect(state.data).toEqual(payload.Quote);
      expect(state.quoteCalculated).toBe(true);
    });
  });

  describe('When "Calculating Change of Service Order Quote" action is made', () => {
    it('should set isCalculatingQuote true', () => {
      const action = {
        payload: {},
        type: QuoteTypes.CALCULATE_CHANGE_OF_SERVICE_ORDER_QUOTE.BEGIN
      };
      const state = reducer(INITIAL_STATE, action);
      expect(state.isCalculatingQuote).toBe(true);
      expect(state.data).toEqual(null);
      expect(state.quoteCalculated).toBe(false);
    });
  });

  describe('When "Calculating Change of Service Order Quote" action is successful', () => {
    it('should add payload to the data', () => {
      const payload = {
        Quote: {
          Totals: {
            SubTotalAmount: 123.32,
            TaxAmount: 28.91,
            TotalAmount: 120.12
          }
        }
      };

      const action = {
        payload,
        type: QuoteTypes.CALCULATE_CHANGE_OF_SERVICE_ORDER_QUOTE.SUCCESS
      };

      const state = reducer(INITIAL_STATE, action);

      expect(state.isCalculatingQuote).toBe(false);
      expect(state.data).toEqual(payload.Quote);
      expect(state.quoteCalculated).toBe(true);
    });
  });

  describe('API Fault', () => {
    test('It should clear the isCalculatingQuote for UPDATE_CART_SUMMARY BEGIN', () => {
      const state = reducer(
        INITIAL_STATE.set('isCalculatingQuote', true),
        {
          payload: {
            trigger: QuoteTypes.CALCULATE_ORDER_QUOTE.BEGIN
          },
          type: FaultTypes.API_FAULT
        }
      );
      expect(state.isCalculatingQuote).toBe(false);
      expect(state.data).toEqual(null);
      expect(state.quoteCalculated).toBe(false);
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

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });
});
