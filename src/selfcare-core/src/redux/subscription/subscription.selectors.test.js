import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './subscription.reducer';
import * as selectors from './subscription.selectors';

const basePath = ['ascendon', 'subscriberApi', 'subscription'];
const initState = Immutable({}).setIn(basePath, INITIAL_STATE);

describe('Subscription ', () => {
  const subscription = {
    Id: 123
  };

  describe('Subscriptions', () => {
    test('It should return the subscriptions map.', () => {
      const state = initState.setIn([...basePath, 'subscriptions', subscription.Id], subscription);
      expect(selectors.Subscriptions(state)).toEqual({
        [subscription.Id]: subscription
      });
    });
  });

  describe('SubscriptionsList', () => {
    test('It should return the subscriptions map as an array.', () => {
      const state = initState.setIn([...basePath, 'subscriptions', subscription.Id], subscription);
      expect(selectors.SubscriptionsList(state)).toEqual([subscription]);
    });
  });

  describe('IsLoadingSubscriptions', () => {
    test('It should return false if no IDs in loading map are true.', () => {
      const state = initState
        .setIn([...basePath, 'loading', 1], false)
        .setIn([...basePath, 'loading', 2], false);
      expect(selectors.IsLoadingSubscriptions(state)).toBe(false);
    });

    test('It should return true if any ID in loading map is true.', () => {
      const state = initState
        .setIn([...basePath, 'loading', 1], false)
        .setIn([...basePath, 'loading', 2], true);
      expect(selectors.IsLoadingSubscriptions(state)).toBe(true);
    });
  });

  describe('IsUpdatingSubscription', () => {
    test('It should return false if no IDS in loading map are true.', () => {
      const state = initState
        .setIn([...basePath, 'updating', 1], false)
        .setIn([...basePath, 'updating', 2], false);
      expect(selectors.IsUpdatingSubscription(state)).toBe(false);
    });

    test('It should return true if any ID in loading map is true.', () => {
      const state = initState
        .setIn([...basePath, 'updating', 1], false)
        .setIn([...basePath, 'updating', 2], true);
      expect(selectors.IsUpdatingSubscription(state)).toBe(true);
    });
  });

  describe('SubscriptionsAreLoaded', () => {
    test('It should return false if any IDs in loaded map are false.', () => {
      const state = initState
        .setIn([...basePath, 'loaded', 1], false)
        .setIn([...basePath, 'loaded', 2], true);
      expect(selectors.SubscriptionsAreLoaded(state)).toBe(false);
    });

    test('It should return true if all IDs in loaded map is true.', () => {
      const state = initState
        .setIn([...basePath, 'loaded', 1], true)
        .setIn([...basePath, 'loaded', 2], true);
      expect(selectors.SubscriptionsAreLoaded(state)).toBe(true);
    });
  });
});
