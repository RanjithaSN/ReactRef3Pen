import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { Ascendon } from '../ascendon/ascendon.selectors';

const Base = createSelector([
  Ascendon
], (ascendon) => {
  return pathOr(null, ['benefitsConfiguration'], ascendon);
});

export const BenefitsConfiguration = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});
