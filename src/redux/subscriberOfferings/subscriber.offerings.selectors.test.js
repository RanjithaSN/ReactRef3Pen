import * as SubscriberOfferings from './subscriber.offerings.selectors';

describe('SubscriberOfferings ', () => {
  describe('When the FormattedSubscriberOfferings is used...', () => {
    test('It should return null when there is no offerings to format.', () => {
      expect(SubscriberOfferings.FormattedSubscriberOfferings.resultFunc([])).toEqual([]);
    });

    test('It should return the formatted offerings when they exist.', () => {
      expect(
        SubscriberOfferings.FormattedSubscriberOfferings.resultFunc([{
          Offering: {
            CurrencyCode: 'USD',
            ThumbnailUrl: 'url'
          },
          OfferingDetail: {
            ConnectedDate: '2018-01-01T12:00:00Z',
            DisplayName: 'Offering Name',
            Name: 'Offering Name',
            OfferingId: '34',
            OfferingInstanceId: '23',
            Subscription: {
              Status: 1
            },
            TotalAmount: 133.33,
            Options: [{
              BillerRuleType: '1'
            }]
          },
          Total: 123.44,
          DiscountTotal: 9.99
        }])
      ).toEqual([{
        ConnectedDate: '2018-01-01T12:00:00Z',
        CurrencyCode: 'USD',
        ThumbnailUrl: 'url',
        DiscountTotal: 9.99,
        DisplayName: 'Offering Name',
        Name: 'Offering Name',
        OfferingId: '34',
        OfferingInstanceId: '23',
        Options: [{
          BillerRuleType: '1'
        }],
        ServiceFeatures: [],
        Status: 1,
        Total: 123.44,
        TotalAmount: 133.33
      }]);
    });
  });

  describe('When ServiceIdLookup is used', () => {
    test('It should return a service ID lookup object with service identifier values as keys', () => {
      expect(SubscriberOfferings.ServiceIdLookup.resultFunc([{
        OfferingDetail: {
          Options: [{
            ServiceAttributeValues: [{
              ServiceId: 138,
              Value: '1'
            }, {
              ServiceId: 177,
              Value: '2'
            }],
            ServiceIdentifierValue: '2'
          }]
        }
      }, {
        OfferingDetail: {
          Options: [{
            ServiceAttributeValues: []
          }]
        }
      }])).toEqual({
        1: 138,
        2: 177
      });
    });
  });
  describe('When ServiceIdentifierValueLookup is used', () => {
    test('It should return a service identifier value lookup object with service identifier values as keys', () => {
      expect(SubscriberOfferings.ServiceIdentifierValueLookup.resultFunc([{
        OfferingDetail: {
          Options: [{
            ServiceAttributeValues: [{
              Value: '1'
            }, {
              Value: '2'
            }],
            ServiceIdentifierValue: '2009'
          }]
        }
      }, {
        OfferingDetail: {
          Options: [{
            ServiceAttributeValues: []
          }]
        }
      }])).toEqual({
        1: '2009',
        2: '2009'
      });
    });
  });

  describe('When ServiceProp is used...', () => {
    test('It should simply return its second argument', () => {
      expect(
        SubscriberOfferings.ServiceProp({}, {
          service: 123
        })
      ).toBe(123);
    });
  });

  describe('When ServiceId is used...', () => {
    test('It should return an ID associated to a service identifier value', () => {
      expect(
        SubscriberOfferings.ServiceId.resultFunc({
          123: 2
        }, 123)
      ).toBe(2);
    });
  });

  describe('When ServiceIdentifierValue is used...', () => {
    test('It should return an ID associated to a service identifier value', () => {
      expect(
        SubscriberOfferings.ServiceIdentifierValue.resultFunc({
          20: 8,
          123: 20,
          432: 'a'
        }, 123)
      ).toBe(20);
    });
  });

  describe('When SubscriberRelatedInformationIsLoading is used...', () => {
    test('Return true when any of the input selectors are true', () => {
      expect(SubscriberOfferings.SubscriberRelatedInformationIsLoading.resultFunc(false, false, true, false)).toBe(true);
    });

    test('Returns false when all of the input selectors are false', () => {
      expect(SubscriberOfferings.SubscriberRelatedInformationIsLoading.resultFunc(false, false, false, false)).toBe(false);
    });
  });
});
