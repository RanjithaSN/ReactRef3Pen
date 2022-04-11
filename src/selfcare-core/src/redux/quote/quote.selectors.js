import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Ordering } from '../ordering/ordering.selectors';

export const Quote = createSelector([
  Ordering
], (ordering) => {
  return pathOr(null, ['quote'], ordering);
});

export const QuoteData = createSelector(
  [Quote],
  (quote) => {
    return pathOr(null, ['data'], quote);
  }
);

export const IsQuotingOrder = createSelector(
  [Quote],
  (quote) => {
    return pathOr(false, ['isCalculatingQuote'], quote);
  }
);

export const QuoteCalculated = createSelector(
  [Quote],
  (quoteData) => {
    return pathOr(false, ['quoteCalculated'], quoteData);
  }
);

export const QuoteItems = createSelector(
  [QuoteData],
  (quote) => {
    return pathOr([], ['Items'], quote);
  }
);
