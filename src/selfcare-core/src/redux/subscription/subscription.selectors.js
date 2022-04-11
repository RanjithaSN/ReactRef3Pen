import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_OBJECT = Immutable({});

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['subscription'], subscriberApi);
});

export const Subscriptions = createSelector([
  Base
], (base) => {
  return pathOr(EMPTY_OBJECT, ['subscriptions'], base);
});

export const SubscriptionsList = createSelector([
  Subscriptions
], (subscriptions) => {
  return Immutable(Object.values(subscriptions));
});

export const IsLoadingSubscriptions = createSelector([
  Base
], (base) => {
  const loadingMap = pathOr(EMPTY_OBJECT, ['loading'], base);
  return Object.values(loadingMap).some((loading) => loading);
});

export const IsUpdatingSubscription = createSelector([
  Base
], (base) => {
  const updatingMap = pathOr(EMPTY_OBJECT, ['updating'], base);
  return Object.values(updatingMap).some((updating) => updating);
});

export const SubscriptionsAreLoaded = createSelector([
  Base
], (base) => {
  const loadedMap = pathOr(EMPTY_OBJECT, ['loaded'], base);
  return Object.values(loadedMap).every((loaded) => loaded);
});
