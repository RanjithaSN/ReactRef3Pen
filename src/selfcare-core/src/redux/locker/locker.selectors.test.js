import Immutable from 'seamless-immutable';
import * as Locker from './locker.selectors';
import { INITIAL_STATE } from './locker.reducer';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      locker: INITIAL_STATE
    }
  }
});

const DATA = [
  {
    Id: '7',
    Product: {
      Name: 'Wireless data',
      ImageUrl: 'http://via.placeholder.com/150x75'
    },
    PricingPlan: {
      Prepaid: true,
      BillerRuleInstanceThumbnails: [
        {
          Amount: 45
        }
      ]
    }
  },
  {
    Id: '8',
    Product: {
      Name: 'Wireless data',
      ImageUrl: 'http://via.placeholder.com/150x75'
    },
    PricingPlan: {
      Prepaid: true,
      BillerRuleInstanceThumbnails: [
        {
          Amount: 45
        }
      ]
    }
  },
  {
    Id: '9',
    Product: {
      Name: 'Wireless data',
      ImageUrl: 'http://via.placeholder.com/150x75'
    },
    PricingPlan: {
      Prepaid: false,
      BillerRuleInstanceThumbnails: [
        {
          Amount: 45
        }
      ]
    }
  }
];

describe('Locker ', () => {
  describe('When the Locker is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const data = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'locker', 'data'], data);
      expect(Locker.Locker(CUSTOM_STATE)).toEqual(data);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Locker.Locker()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(Locker.Locker.resultFunc({})).toBeNull();
    });
  });

  describe('When the LockerItems is used...', () => {
    test('It should lockerItems data equal to data', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'locker', 'data', 'LockerItems'], DATA);
      expect(Locker.LockerItems(CUSTOM_STATE)).toEqual(DATA);
    });
    test('It should return and empty array of locker items when there are not locker items.', () => {
      const EMPTY_ARRAY = [];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'locker', 'data', 'LockerItems'], EMPTY_ARRAY);
      expect(Locker.LockerItems(CUSTOM_STATE)).toEqual(EMPTY_ARRAY);
    });
    test('It should return and empty array when there is no store', () => {
      const EMPTY_ARRAY = [];
      expect(Locker.LockerItems()).toEqual(EMPTY_ARRAY);
    });
  });
});
