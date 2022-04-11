import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './search.offers.reducer';
import * as SearchOffers from './search.offers.selectors';

const initializedStore = new Immutable({
  client: {
    searchOffers: INITIAL_STATE
  }
});

describe('SearchOffers ', () => {
  describe('When the EligibilityModalDismissed is used...', () => {
    test('It should return false when not set', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'searchOffers'], null);
      expect(SearchOffers.EligibilityModalDismissed(CUSTOM_STATE)).toBe(false);
    });

    test('It should return true when set to true', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'searchOffers', 'eligibilityModalDismissed'], true);
      expect(SearchOffers.EligibilityModalDismissed(CUSTOM_STATE)).toBe(true);
    });
  });
});
