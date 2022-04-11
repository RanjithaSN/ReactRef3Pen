import { CurrentValidSession } from '@selfcare/core/redux/session/session.selectors';
import { SubscriberIsLoaded } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Client } from '../../client.selectors';

const BaseSubscriberInformation = createSelector(
  Client,
  (client) => pathOr(null, ['subscriberInformation'], client)
);

export const ProspectData = createSelector(
  BaseSubscriberInformation,
  (base) => pathOr(null, ['prospect'], base)
);

export const ProspectIsAvailable = createSelector(
  ProspectData,
  (prospect) => Boolean(prospect)
);

export const ProspectUpdateError = createSelector(
  BaseSubscriberInformation,
  (base) => pathOr(null, ['updateError'], base)
);

export const UserIsAvailable = createSelector(
  ProspectIsAvailable,
  SubscriberIsLoaded,
  (isProspect, isSubscriber) => (isProspect || isSubscriber)
);

export const NonProspectIsLoggedIn = createSelector([
  ProspectIsAvailable,
  CurrentValidSession
], (prospectAvailable, currentSession) => {
  return Boolean(currentSession && !prospectAvailable);
});
