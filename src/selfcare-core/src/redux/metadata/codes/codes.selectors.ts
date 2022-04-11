import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import { MEASUREMENT_CONSTANTS } from '@selfcare/core/redux/convergentBillerAccountUsageDetails/usage.conversion.constants';
import curry from 'ramda/src/curry';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { Metadata } from '../../ascendon/ascendon.selectors';
import { CODES } from './codes.constants';

const EMPTY_ARRAY = Immutable([]);

export const Base = createSelector([
  Metadata
], (metadata) => {
  return pathOr(null, ['codes'], metadata);
});

export const IsLoading = createSelector(
  [Base],
  (codesBase) => {
    return Object.values(codesBase).some((codeObject) => {
      return codeObject.status === LOADING_STATUS.LOADING;
    });
  }
);

export const ExternalReferenceId = createSelector(
  [Base],
  (Codes) => {
    return pathOr(null, [CODES.ExternalReferenceId, 'items', '0', 'AdditionalProperties', 'ExternalReferenceId'], Codes);
  }
);

export const Code = curry((code, store) => pathOr(null, [code], Base(store)));

/**
 * Returns status for codeType: unloaded, loading, or loaded
 * @param codeType - code type to retrieve
 * @param store - redux store
 */
export const CodeStatus = curry((code, store) => {
  const codeObject = Code(code, store);
  return pathOr(LOADING_STATUS.UNLOADED, ['status'], codeObject);
});

/**
 * Returns load state for codeType if it's in the store
 * @param codeType - code type to retrieve
 * @param store - redux store
 */
export const CodeLoaded = curry((code, store) => {
  const codeObject = Code(code, store);
  return path(['status'], codeObject) === LOADING_STATUS.LOADED;
});

/**
 * Returns items for codeType if it's in the store
 * @param codeType - code type to retrieve
 * @param store - redux store
 */
export const CodeItems = curry((code, store) => {
  const codeObject = Code(code, store);
  return codeObject ? codeObject.items : EMPTY_ARRAY;
});

export const SpecificOrGlobalCode = curry((code, store) => (CodeLoaded(code, store) ?
  CodeItems(code, store).reduce((prev, curr) => (prev.Global ? curr : prev)) :
  null
));

export const codeValueOptions = (codes) => codes.map((code) => ({
  label: code.Name,
  value: code.Value
}));

export const SelectOptionsForCodeValues = curry((code, store) => codeValueOptions(CodeItems(code, store)));

export const UnitsOfMeasure = createSelector([
  CodeItems(CODES.UnitOfMeasure)
], (units) => {
  const measures = {};
  if (units.length) {
    units.forEach((unit) => {
      if (MEASUREMENT_CONSTANTS[unit.Value]) {
        measures[unit.Value] = {
          Name: unit.Name,
          Conversion: MEASUREMENT_CONSTANTS[unit.Value].conversionToGigabytes
        };
      }
    });
  }
  return measures;
});
