import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { ApplicationState } from '../index';

export const Ascendon = (state: ApplicationState) => {
  return pathOr(null, ['ascendon'], state);
};

export const Metadata = createSelector([
  Ascendon
], (ascendon) => {
  return pathOr(null, ['metadata'], ascendon);
});

export const SubscriberApi = createSelector([
  Ascendon
], (ascendon) => {
  return pathOr(null, ['subscriberApi'], ascendon);
});
