import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './search.offers.reducer';
import * as SearchOffers from './search.offers.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      searchOffers: INITIAL_STATE
    }
  }
});

const DATA = [];

describe('SearchOffers ', () => {
  describe('When the SearchOffers is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const data = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'offering', 'data'], data);
      expect(SearchOffers.SearchOffers(CUSTOM_STATE)).toEqual(data);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(SearchOffers.SearchOffers()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(SearchOffers.SearchOffers.resultFunc({})).toBeNull();
    });
  });

  describe('When the SearchOffersIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'offering', 'isLoading'], true);
      expect(SearchOffers.SearchOffersIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(SearchOffers.SearchOffersIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(SearchOffers.SearchOffersIsLoading.resultFunc({})).toBe(false);
    });
  });

  describe('When the SearchOffersIsLoaded is used...', () => {
    test('It should return true if there is data and we are not loading.', () => {
      expect(SearchOffers.SearchOffersIsLoaded.resultFunc({}, false)).toBe(true);
    });

    test('It should return false when there is no data.', () => {
      expect(SearchOffers.SearchOffersIsLoaded.resultFunc(null, false)).toBe(false);
    });

    test('It should return false when we are loading.', () => {
      expect(SearchOffers.SearchOffersIsLoaded.resultFunc({}, true)).toBe(false);
    });
  });

  describe('When the SearchOffersOfferings is used...', () => {
    test('It should contain search offer data equal to data', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'offering', 'data', 'Offerings'], DATA);
      expect(SearchOffers.SearchOffersOfferings(CUSTOM_STATE)).toEqual(DATA);
    });
    test('It should return and empty array of search offer items when there are not search offers items.', () => {
      const EMPTY_ARRAY = [];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'offering', 'data', 'Offerings'], EMPTY_ARRAY);
      expect(SearchOffers.SearchOffersOfferings(CUSTOM_STATE)).toEqual(EMPTY_ARRAY);
    });
    test('It should return and empty array when there is no store', () => {
      const EMPTY_ARRAY = [];
      expect(SearchOffers.SearchOffersOfferings()).toEqual(EMPTY_ARRAY);
    });
  });
});
