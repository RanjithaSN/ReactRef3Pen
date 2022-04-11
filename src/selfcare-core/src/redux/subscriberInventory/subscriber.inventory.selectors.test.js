import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './subscriber.inventory.reducer';
import * as SubscriberInventory from './subscriber.inventory.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      subscriberInventory: INITIAL_STATE
    }
  }
});

describe('SubscriberInventory ', () => {
  describe('When the SubscriberInventory is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = [{
        id: 1
      }];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriberInventory', 'data', 'SubscriberInventoryItems'], DATA);
      expect(SubscriberInventory.SubscriberInventory(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return an empty array when there is no store passed in.', () => {
      expect(SubscriberInventory.SubscriberInventory()).toEqual([]);
    });

    test('It should return an empty array when there is no data attribute in the store.', () => {
      expect(SubscriberInventory.SubscriberInventory.resultFunc({})).toEqual([]);
    });
  });

  describe('When the SubscriberInventoryIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriberInventory', 'isLoading'], true);
      expect(SubscriberInventory.SubscriberInventoryIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(SubscriberInventory.SubscriberInventoryIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(SubscriberInventory.SubscriberInventoryIsLoading.resultFunc({})).toBe(false);
    });
  });

  describe('When the SubscriberInventoryIsLoaded is used...', () => {
    test('It should return true if there is data and we are not loading.', () => {
      expect(SubscriberInventory.SubscriberInventoryIsLoaded.resultFunc({}, false)).toBe(true);
    });

    test('It should return false when there is no data.', () => {
      expect(SubscriberInventory.SubscriberInventoryIsLoaded.resultFunc(null, false)).toBe(false);
    });

    test('It should return false when we are loading.', () => {
      expect(SubscriberInventory.SubscriberInventoryIsLoaded.resultFunc({}, true)).toBe(false);
    });
  });
});
