import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_OBJECT = {};

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['subscriberInformation'], subscriberApi);
});

const SubscriberInformationData = createSelector([
  Base
], (base) => pathOr(EMPTY_OBJECT, ['data'], base));

export const SsnLookup = createSelector([
  SubscriberInformationData
], (data) => pathOr(EMPTY_OBJECT, ['ssnLookup'], data));

export const SsnLookupIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const ssnLookupStudent = createSelector(
  SubscriberInformationData,
  (data) => pathOr(EMPTY_OBJECT, ['ssnLookupStudent'], data)
);

export const UpdateSubscriberIsLoading = createSelector([
  Base
], (base) => pathOr(false, ['updateSubscriberLoading'], base));

export const SsnLookupHasError = createSelector(
  SsnLookup,
  (ssnLookup) => (Boolean(path(['errorMessage'], ssnLookup)))
);

export const SsnLookupIsLoaded = createSelector([
  SsnLookup,
  SsnLookupIsLoading,
  SsnLookupHasError
], (data, isLoading, hasError) => {
  return Boolean(Object.keys(data).length && !isLoading && !hasError);
});

export const LegalName = createSelector(
  SsnLookup,
  SsnLookupHasError,
  (ssnLookup, hasError) => (hasError ? '' : `${pathOr('', ['fNamn'], ssnLookup)} ${pathOr('', ['eNamn'], ssnLookup)}`.trim())
);

export const PostalCode = createSelector(
  SsnLookup,
  SsnLookupHasError,
  (ssnLookup, hasError) => (hasError ? '' : `${pathOr('', ['fbfPostnr'], ssnLookup)}`).replace(/(\d{3})/, '$1 ')
);
