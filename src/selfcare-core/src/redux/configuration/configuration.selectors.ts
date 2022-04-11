import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { Ascendon } from '../ascendon/ascendon.selectors';
import { CodeItems } from '../metadata/codes/codes.selectors';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  Ascendon
], (ascendon) => {
  return pathOr(null, ['configuration'], ascendon);
});

export const Configuration = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const Environments = createSelector([
  Configuration
], (data) => {
  return pathOr(EMPTY_ARRAY, ['environments'], data);
});

export const Locales = createSelector([
  Configuration
], (data) => {
  return pathOr(EMPTY_ARRAY, ['locales'], data);
});

export const BusinessUnits = createSelector([
  Configuration
], (data) => {
  return pathOr(EMPTY_ARRAY, ['businessUnits'], data);
});

export const AllowSystemIdChange = createSelector([
  Configuration
], (data) => {
  return pathOr(false, ['allowSystemIdChange'], data);
});

/** Penny is using the DBSS BU, this value will always be true. API check removed to lessen API calls. */
export const IsDbss = createSelector(
  [CodeItems(null)],
  (values) => {
    return !(values && values.length);
  }
);
