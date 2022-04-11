import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Ordering } from '../ordering/ordering.selectors';

export const SubmitOrder = createSelector([
  Ordering
], (ordering) => {
  return pathOr(null, ['submitOrder'], ordering);
});

export const SubmitOrderData = createSelector(
  [SubmitOrder],
  (submitOrder) => {
    return pathOr(null, ['data'], submitOrder);
  }
);

export const IsSubmittingOrder = createSelector(
  [SubmitOrder],
  (submitOrder) => {
    return pathOr(false, ['isSubmittingOrder'], submitOrder);
  }
);

export const IsSubmitOrderLoaded = createSelector([
  SubmitOrder
], (submitOrder) => {
  return pathOr(false, ['isSubmitOrderLoaded'], submitOrder);
});
