import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Ordering } from '../ordering/ordering.selectors';

const Base = createSelector(
  Ordering,
  (ordering) => {
    return pathOr(null, ['transitioningContext'], ordering);
  }
);

export const TransitioningContext = createSelector(
  Base,
  (base) => {
    return pathOr(null, ['data'], base);
  }
);

export const TransitioningOutcomes = createSelector(
  TransitioningContext,
  (context) => pathOr(null, ['TransitionContext', 'Outcomes'], context)
);
