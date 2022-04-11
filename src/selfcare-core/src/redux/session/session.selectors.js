import { ISO_CODE_FOR_SWEDEN } from '@selfcare/core/constants/subscriber';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['session'], subscriberApi);
});

export const CurrentSession = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const CurrentLocation = createSelector([
  Base
], (base) => {
  return pathOr(null, ['currentCountry'], base);
});

export const CurrentlyInSweden = createSelector(
  CurrentLocation,
  (location) => location === ISO_CODE_FOR_SWEDEN
);

export const IsCurrentSessionRefreshing = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isRefreshing'], base);
});

export const IsCurrentSessionCreating = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isCreating'], base);
});

export const SessionIsExpired = createSelector([
  Base
], (base) => {
  return pathOr(false, ['sessionExpired'], base);
});

export const CurrentValidSession = createSelector([
  CurrentSession,
  SessionIsExpired
], (session, expired) => (!expired ? session : null));
