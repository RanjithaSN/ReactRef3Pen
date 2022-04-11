import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { QuoteTypes } from './quote.actions';

export const INITIAL_STATE = Immutable({
  data: null,
  quoteCalculated: false,
  isCalculatingQuote: false
});

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case QuoteTypes.CALCULATE_ORDER_QUOTE.SUCCESS:
  case QuoteTypes.CALCULATE_CHANGE_OF_SERVICE_ORDER_QUOTE.SUCCESS:
  case QuoteTypes.CALCULATE_PRODUCT_ORDER_QUOTE.SUCCESS:
    return state
      .set('isCalculatingQuote', false)
      .set('data', payload.Quote)
      .set('quoteCalculated', true);
  case QuoteTypes.CALCULATE_ORDER_QUOTE.BEGIN:
  case QuoteTypes.CALCULATE_CHANGE_OF_SERVICE_ORDER_QUOTE.BEGIN:
  case QuoteTypes.CALCULATE_PRODUCT_ORDER_QUOTE.BEGIN:
    return state.set('isCalculatingQuote', true)
      .set('data', null)
      .set('quoteCalculated', false);
  case QuoteTypes.CLEAR_ORDER_QUOTE:
    return INITIAL_STATE;
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case QuoteTypes.CALCULATE_ORDER_QUOTE.BEGIN:
    case QuoteTypes.CALCULATE_CHANGE_OF_SERVICE_ORDER_QUOTE.BEGIN:
    case QuoteTypes.CALCULATE_PRODUCT_ORDER_QUOTE.BEGIN:
      return state.set('isCalculatingQuote', false);
    default:
      return state;
    }
  default:
    return state;
  }
};
