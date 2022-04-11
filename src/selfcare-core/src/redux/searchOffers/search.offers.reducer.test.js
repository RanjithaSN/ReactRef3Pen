import { FaultTypes } from '../fault/fault.actions';
import { SearchOfferTypes } from './search.offers.actions';
import reducer, { INITIAL_STATE } from './search.offers.reducer';

describe('SearchOffers Reducer', () => {
  describe('When SearchOffersTypes.ClearSearchOfferings is dispatched...', () => {
    let response;
    const CUSTOM_STATE = INITIAL_STATE
      .set('data', {})
      .set('isLoading', true);

    beforeEach(() => {
      response = reducer(CUSTOM_STATE, {
        type: SearchOfferTypes.ClearSearchOfferings
      });
    });

    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should set the data attribute to the initial state.', () => {
      expect(response.data).toBe(INITIAL_STATE.data);
    });
  });
  describe('When SearchOffersTypes.RetrieveSearchOffers.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SearchOfferTypes.SearchOfferings.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });

  describe('When SearchOffersTypes.RetrieveSearchOffers.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      Offerings: [{
        id: 1
      }]
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: SearchOfferTypes.SearchOfferings.SUCCESS,
        payload
      });
    });

    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should add the new offerings to the list.', () => {
      expect(response.data.Offerings).toEqual(payload.Offerings);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the SearchOffersTypes.SearchOffers.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SearchOfferTypes.SearchOfferings.BEGIN
        }
      });

      expect(response.isLoading).toBe(false);
    });

    test('It should return the state passed to the reducer for any other fault.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: 'some other action'
        }
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });

  describe('When update address is dispatched...', () => {
    test('It should update the address in the store', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const address = {
        addressLine1: '8002 S 135th St',
        addressLine2: '#500',
        city: 'Omaha',
        country: 'US',
        postal_code: '68138',
        state: 'NE'
      };

      const response = reducer(CUSTOM_STATE, {
        type: SearchOfferTypes.UpdateAddress,
        payload: {
          address,
          rememberLocation: true
        }
      });

      expect(response.address).toEqual(address);
      expect(response.rememberLocation).toBe(true);/**/
    });
  });

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });
});
