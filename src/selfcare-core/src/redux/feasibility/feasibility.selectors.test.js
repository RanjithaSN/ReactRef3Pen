import { AddressList, FeasibilityAttributeData, FeasibilityIsLoaded, FeasibilityIsLoading, SubscriberAvailableOffers, SubscriberFeasibilityAddress } from './feasibility.selectors';

describe('Feasibility Selectors', () => {
  describe('SubscriberAvailableOffers', () => {
    test('should return the sub-object when set', () => {
      expect(SubscriberAvailableOffers.resultFunc({
        offers: {
          offers: 'some data'
        }
      })).toEqual('some data');
    });

    test('should return an empty array when no data is present', () => {
      expect(SubscriberAvailableOffers.resultFunc({})).toEqual([]);
    });
  });

  describe('FeasibilityIsLoading', () => {
    test('should return true when the state has it marked as true', () => {
      expect(FeasibilityIsLoading.resultFunc({
        isLoading: true
      })).toBeTruthy();
    });
    test('should return false when the state has it marked as false', () => {
      expect(FeasibilityIsLoading.resultFunc({
        isLoading: false
      })).toBeFalsy();
    });
  });

  describe('FeasibilityIsLoaded', () => {
    test('should return true when the state has it marked as false and data is available', () => {
      expect(FeasibilityIsLoaded.resultFunc(false, {
        hi: 'here'
      })).toBeTruthy();
    });
    test('should return false when the state has it marked as false', () => {
      expect(FeasibilityIsLoaded.resultFunc(false, undefined)).toBeFalsy();
    });
    test('should return false when the state has it marked as true, yet no data is available', () => {
      expect(FeasibilityIsLoaded.resultFunc(true, {})).toBeFalsy();
    });
  });

  describe('AddressList', () => {
    test('should return a list of sorted addresses when there are addresses and we are not loading', () => {
      expect(AddressList.resultFunc([{
        addressLocation: '20',
        addressName: 'ALVÄGEN',
        id: 28957959,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '2',
        addressName: 'BJÖRKVÄGEN',
        id: 29099479,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '4A',
        addressName: 'BJÖRKVÄGEN',
        id: 29099481,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '4',
        addressName: 'BJÖRKVÄGEN',
        id: 29099480,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '26',
        addressName: 'ALVÄGEN',
        id: 28957962,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '14',
        addressName: 'ASPVÄGEN',
        id: 32126531,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '4B',
        addressName: 'BJÖRKVÄGEN',
        id: 2099480,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '22',
        addressName: 'ASPVÄGEN',
        id: 32126532,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '4',
        addressName: 'ASPVÄGEN',
        id: 32126534,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      },
      {
        addressLocation: '10',
        addressName: 'ALVÄGEN',
        id: 22537554,
        postalCode: '862 33',
        postalPlace: 'KVISSLEBY'
      }])).toEqual([
        {
          label: 'ALVÄGEN 10',
          value: 22537554
        },
        {
          label: 'ALVÄGEN 20',
          value: 28957959
        },
        {
          label: 'ALVÄGEN 26',
          value: 28957962
        },
        {
          label: 'ASPVÄGEN 4',
          value: 32126534
        },
        {
          label: 'ASPVÄGEN 14',
          value: 32126531
        },
        {
          label: 'ASPVÄGEN 22',
          value: 32126532
        },
        {
          label: 'BJÖRKVÄGEN 2',
          value: 29099479
        },
        {
          label: 'BJÖRKVÄGEN 4',
          value: 29099480
        },
        {
          label: 'BJÖRKVÄGEN 4A',
          value: 29099481
        },
        {
          label: 'BJÖRKVÄGEN 4B',
          value: 2099480
        }
      ]);
    });
    test('should return an empty list when the we either are loading or have null addresses', () => {
      expect(AddressList.resultFunc(null)).toEqual([]);
      expect(AddressList.resultFunc([])).toEqual([]);
    });
  });

  describe('FeasibilityAttributeData', () => {
    test('should return empty object if no data available', () => {
      expect(FeasibilityAttributeData.resultFunc({})).toEqual({});
    });
    test('should return data when address ID is filled in', () => {
      const ADDRESS_ID = 987987;
      const UNIT_NUM = 9999999;
      const SERVICE_ID = 3333333;
      const result = FeasibilityAttributeData.resultFunc({
        attributes: {
          addressId: ADDRESS_ID,
          unitName: UNIT_NUM,
          serviceId: SERVICE_ID
        }
      });
      expect(result.address).toEqual(ADDRESS_ID);
      expect(result.unitNum).toEqual(UNIT_NUM);
      expect(result.serviceId).toEqual(SERVICE_ID);
    });
  });

  describe('SubscriberFeasibilityAddress', () => {
    test('should return null when nothing can be parsed', () => {
      expect(SubscriberFeasibilityAddress.resultFunc('null')).toBe(null);
    });
    test('should return the JSON parsed data when we pass in data', () => {
      const object = {
        prop: 'value',
        prop2: 'value2'
      };
      const result = SubscriberFeasibilityAddress.resultFunc(JSON.stringify(object));
      expect(result.prop).toEqual(object.prop);
      expect(result.prop2).toEqual(object.prop2);
    });
  });
});
