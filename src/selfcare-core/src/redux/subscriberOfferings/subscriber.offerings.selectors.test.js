import Immutable from 'seamless-immutable';
import LOADING_STATUS from '../../constants/loading.status';
import { INITIAL_STATE } from './subscriber.offerings.reducer';
import * as SubscriberOfferings from './subscriber.offerings.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      subscriberOfferings: INITIAL_STATE
    }
  }
});

describe('SubscriberOfferings ', () => {
  describe('When the SubscriberOfferings is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = [{
        id: 1
      }];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriberOfferings', 'data', 'SubscriberOfferings'], DATA);
      expect(SubscriberOfferings.SubscriberOfferings(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return an empty array when there is no store passed in.', () => {
      expect(SubscriberOfferings.SubscriberOfferings()).toEqual([]);
    });

    test('It should return an empty array when there is no data attribute in the store.', () => {
      expect(SubscriberOfferings.SubscriberOfferings.resultFunc({})).toEqual([]);
    });
  });

  describe('When the SubscriberOfferingsIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriberOfferings', 'isLoading'], true);
      expect(SubscriberOfferings.SubscriberOfferingsIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(SubscriberOfferings.SubscriberOfferingsIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(SubscriberOfferings.SubscriberOfferingsIsLoading.resultFunc({})).toBe(false);
    });
  });

  describe('When the SubscriberOfferingsIsLoaded is used...', () => {
    test('It should return true if there is data and we are not loading.', () => {
      expect(SubscriberOfferings.SubscriberOfferingsIsLoaded.resultFunc({}, false)).toBe(true);
    });

    test('It should return false when there is no data.', () => {
      expect(SubscriberOfferings.SubscriberOfferingsIsLoaded.resultFunc(null, false)).toBe(false);
    });

    test('It should return false when we are loading.', () => {
      expect(SubscriberOfferings.SubscriberOfferingsIsLoaded.resultFunc({}, true)).toBe(false);
    });
  });

  describe('When the SubscriberOfferingsSortedByCycleDate is used...', () => {
    const OFFERINGS = [{
      Offering: {
        Name: 'Offering 1',
        Id: '34'
      },
      OfferingDetail: {
        Subscription: {
          CycleDate: '2018-12-23T22:08:26.370Z'
        }
      }
    }, {
      Offering: {
        Name: 'Offering 2',
        Id: '22'
      },
      OfferingDetail: {
        Subscription: {
          CycleDate: '2018-12-21T22:08:26.370Z'
        }
      }
    }];

    test('It should return the offerings sorted by Cycle Date', () => {
      const STORE_WITH_DATA = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriberOfferings', 'data', 'SubscriberOfferings'], OFFERINGS);
      const response = SubscriberOfferings.SubscriberOfferingsSortedByCycleDate(STORE_WITH_DATA);
      expect(response[0].Offering.Id).toEqual('34');
      expect(response[1].Offering.Id).toEqual('22');
    });

    test('It should return an empty array when offering do not exist', () => {
      const STORE_WITHOUT_DATA = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriberOfferings', 'data', 'SubscriberOfferings'], null);
      expect(SubscriberOfferings.SubscriberOfferingsSortedByCycleDate(STORE_WITHOUT_DATA)).toEqual([]);
    });
  });

  describe('When the MultipleSubscription is used...', () => {
    const OFFERINGS = [{
      Offering: {
        Name: 'Offering 1',
        Id: '34',
        CurrencyCode: 'USD',
        ThumbnailUrl: ''
      },
      OfferingDetail: {
        Name: 'Offer23',
        OfferingInstanceId: 222,
        Status: 4,
        Subscription: {
          Id: '123',
          Cycle: 2,
          CycleDate: '2018-12-23T22:00:26.370Z',
          RenewAmount: 123.33
        },
        Options: [{
          Status: 1,
          OfferingOptionId: 2,
          PlanName: 'Offer23',
          ProductName: 'Add-on 1',
          ProductId: 1,
          TotalAmount: '129.99'
        }, {
          Status: 1,
          OfferingOptionId: 1,
          PlanName: 'Some other plan',
          ProductName: 'Add-on 2',
          ProductId: 2,
          TotalAmount: '9.99'
        }]
      }
    }];

    const SUBSCRIPTIONS = {
      123: {
        Id: '123',
        OfferingId: '34',
        PendingOrderId: null,
        PaymentInstrument: null,
        Items: [{
          Product: {
            Id: 1,
            ImageUrl: ''
          }
        }, {
          Product: {
            Id: 2,
            ImageUrl: ''
          }
        }]
      }
    };

    test('It should return formatted array of details when offerings exist and cycleTypes are loaded', () => {
      const STORE_WITH_DATA = initializedStore
        .setIn(['ascendon', 'subscriberApi', 'subscriberOfferings', 'data', 'SubscriberOfferings'], OFFERINGS)
        .setIn(['ascendon', 'subscriberApi', 'subscription', 'subscriptions'], SUBSCRIPTIONS)
        .setIn(['ascendon', 'metadata', 'codes', 102], {
          status: LOADING_STATUS.LOADED,
          items: [{
            Value: '2',
            Name: 'Monthly'
          }]
        });
      const EXPECTED = [{
        name: OFFERINGS[0].Offering.Name,
        id: OFFERINGS[0].Offering.Id,
        offeringInstanceId: OFFERINGS[0].OfferingDetail.OfferingInstanceId,
        pendingOrderId: null,
        paymentInstrument: null,
        thumbnailUrl: OFFERINGS[0].Offering.ThumbnailUrl,
        renewAmount: OFFERINGS[0].OfferingDetail.Subscription.RenewAmount,
        cycleType: 'Monthly',
        cycleDate: '2018-12-23T00:00:00.000Z',
        currencyCode: OFFERINGS[0].Offering.CurrencyCode,
        addOns: [{
          status: 1,
          name: 'Add-on 1',
          amount: '129.99',
          pendingOrderId: null,
          offeringId: OFFERINGS[0].Offering.Id,
          offeringName: 'Offering 1',
          offeringOptionId: 2,
          offeringInstanceId: OFFERINGS[0].OfferingDetail.OfferingInstanceId,
          isBaseOffer: true,
          cycleType: 'Monthly',
          currencyCode: 'USD',
          thumbnailUrl: Object.values(SUBSCRIPTIONS)[0].Items[0].Product.ImageUrl
        }, {
          status: 1,
          name: 'Add-on 2',
          amount: '9.99',
          pendingOrderId: null,
          offeringId: OFFERINGS[0].Offering.Id,
          offeringName: 'Offering 1',
          offeringOptionId: 1,
          offeringInstanceId: OFFERINGS[0].OfferingDetail.OfferingInstanceId,
          isBaseOffer: false,
          cycleType: 'Monthly',
          currencyCode: 'USD',
          thumbnailUrl: Object.values(SUBSCRIPTIONS)[0].Items[1].Product.ImageUrl
        }],
        status: '',
        isLocked: false,
        isPaymentExpired: false
      }];
      expect(SubscriberOfferings.MultipleSubscription(STORE_WITH_DATA)).toEqual(EXPECTED);
    });

    test('It should return an empty array when offerings do not exist', () => {
      const STORE_WITHOUT_DATA = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriberOfferings', 'data', 'SubscriberOfferings'], null);
      expect(SubscriberOfferings.MultipleSubscription(STORE_WITHOUT_DATA)).toEqual([]);
    });

    test('It should return an empty array when cycle types metadata is not loaded', () => {
      const STORE_WITHOUT_DATA = initializedStore.setIn(['ascendon', 'metadata', 'codes', 102], {
        status: LOADING_STATUS.UNLOADED,
        items: []
      });
      expect(SubscriberOfferings.MultipleSubscription(STORE_WITHOUT_DATA)).toEqual([]);
    });
  });
});
