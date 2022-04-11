import Immutable from 'seamless-immutable';
import i18next from 'i18next';
import {
  AreAddressesLoading,
  AreAddressesLoaded,
  DefaultBillingAddress,
  SubscriberAddresses
} from './address.selectors';
import { INITIAL_STATE } from './address.reducer';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      address: INITIAL_STATE
    }
  }
});

const EMPTY_STATE = new Immutable({});


describe('Address ', () => {
  beforeEach(() => {
    i18next.t = jest.fn(() => 'translated string');
  });
  describe('When AreAddressesLoading is used', () => {
    test('it should return false when not set', () => {
      const response = AreAddressesLoading(EMPTY_STATE);

      expect(response).toBe(false);
    });

    test('it should return false when set to false', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'address', 'isLoading'], false);
      const response = AreAddressesLoading(CUSTOM_STATE);

      expect(response).toBe(false);
    });

    test('it should return true when set', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'address', 'isLoading'], true);
      const response = AreAddressesLoading(CUSTOM_STATE);

      expect(response).toBe(true);
    });
  });

  describe('When AreAddressesLoaded is used', () => {
    test('it should return false when not set', () => {
      const response = AreAddressesLoaded(EMPTY_STATE);

      expect(response).toBe(false);
    });

    test('it should return false when set to false', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'address', 'isLoaded'], false);
      const response = AreAddressesLoaded(CUSTOM_STATE);

      expect(response).toBe(false);
    });

    test('it should return true when set', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'address', 'isLoaded'], true);
      const response = AreAddressesLoaded(CUSTOM_STATE);

      expect(response).toBe(true);
    });
  });

  describe('When SubscriberAddresses is used', () => {
    test('it should return empty array when not set', () => {
      const response = SubscriberAddresses(EMPTY_STATE);

      expect(response).toEqual([]);
    });

    test('it should return array set in store', () => {
      const ADDRESSES = [
        {
          postal_code: '12345'
        }
      ];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'address', 'data'], ADDRESSES);
      const response = SubscriberAddresses(CUSTOM_STATE);

      expect(response).toEqual(ADDRESSES);
    });
  });


  describe('When the DefaultBillingAddress is used...', () => {
    test('It should return a mapped copy of the address', () => {
      const ADDRESSES = [{
        LineOne: '8002 S 135th St',
        LineTwo: '#500',
        City: 'Omaha',
        State: 'NE',
        PostalCode: '68138',
        Country: 'US',
        DefaultBilling: true
      }];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'address', 'data'], ADDRESSES);
      expect(DefaultBillingAddress(CUSTOM_STATE)).toEqual({
        addressLine1: ADDRESSES[0].LineOne,
        addressLine2: ADDRESSES[0].LineTwo,
        city: ADDRESSES[0].City,
        region: ADDRESSES[0].State,
        country: ADDRESSES[0].Country,
        postalCode: ADDRESSES[0].PostalCode,
        defaults: [{
          id: 'defaultBilling',
          label: 'translated string',
          value: true
        }, {
          id: 'defaultService',
          label: 'translated string',
          value: false
        }, {
          id: 'defaultShipping',
          label: 'translated string',
          value: false
        }]
      });
    });

    test('It should return null when there is no store passed in.', () => {
      expect(DefaultBillingAddress()).toBeNull();
    });

    test('It should return an null when there are no addresses in the store.', () => {
      expect(DefaultBillingAddress()).toBeNull();
    });
  });
});
