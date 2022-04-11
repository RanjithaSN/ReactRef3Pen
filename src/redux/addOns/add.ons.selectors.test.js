import Immutable from 'seamless-immutable';
import * as AddOns from './add.ons.selectors';

const codeItems = new Immutable([{
  Name: 'Product',
  Value: 1
}, {
  Name: 'Service Feature',
  Value: 2
}, {
  Name: 'Ad Hoc',
  Value: 3
}]);

describe('AddOns ', () => {
  describe('When Base is used...', () => {
    test('It should return the base addOns state', () => {
      expect(AddOns.Base.resultFunc({
        addOns: {}
      })).toEqual({});
    });
  });

  describe('When AddOnCode is used...', () => {
    test('It should return a service feature code when one exists', () => {
      expect(AddOns.AddOnCode.resultFunc(codeItems)).toBe(2);
    });

    test('It should return null when service code does not exist', () => {
      expect(AddOns.AddOnCode.resultFunc([])).toBeNull();
    });
  });

  describe('When ExistingPlanQuantitiesByServiceId is used...', () => {
    let offerings;
    let serviceIdLookup;

    beforeEach(() => {
      offerings = [
        {
          ServiceFeatures: [
            {
              ProductId: 1,
              PricingPlanId: 1,
              ServiceAttributeValues: [
                {
                  Value: 'service-123'
                }
              ],
              Status: AddOns.SERVICE_FEATURE_STATUS.ACTIVE
            },
            {
              ProductId: 1,
              PricingPlanId: 2,
              ServiceAttributeValues: [
                {
                  Value: 'service'
                }
              ],
              Status: AddOns.SERVICE_FEATURE_STATUS.ACTIVE
            }
          ]
        },
        {
          ServiceFeatures: [
            {
              ProductId: 2,
              PricingPlanId: 3,
              ServiceAttributeValues: [
                {
                  Value: 'service-1234'
                }
              ],
              Status: AddOns.SERVICE_FEATURE_STATUS.ACTIVE
            },
            {
              ProductId: 2,
              PricingPlanId: 4,
              ServiceAttributeValues: [
                {
                  Value: 'service'
                }
              ],
              Status: AddOns.SERVICE_FEATURE_STATUS.ACTIVE
            }
          ]
        }
      ];
      serviceIdLookup = {
        'service-123': 1,
        'service-1234': 2
      };
    });

    describe('And there are offers', () => {
      describe('And there are ServiceFeatures with Active status', () => {
        describe('And there are serviceIds for attribute values', () => {
          it('Should return existing plans by serviceId', () => {
            expect(AddOns.ExistingPlanQuantitiesByServiceId.resultFunc(offerings, serviceIdLookup)).toEqual({
              1: {
                'service-123': {
                  1: {
                    1: 1
                  }
                }
              },
              2: {
                'service-1234': {
                  2: {
                    3: 1
                  }
                }
              }
            });
          });
        });

        describe('And there are no serviceIds for attribute values', () => {
          it('Should return empty existing plans', () => {
            serviceIdLookup = {};
            expect(AddOns.ExistingPlanQuantitiesByServiceId.resultFunc(offerings, serviceIdLookup)).toEqual({});
          });
        });
      });

      describe('And there are no ServiceFeatures with active status', () => {
        it('Should return empty existing plans', () => {
          offerings[0].ServiceFeatures[0].Status = AddOns.SERVICE_FEATURE_STATUS.PENDING_ACTIVE;
          offerings[0].ServiceFeatures[1].Status = AddOns.SERVICE_FEATURE_STATUS.PENDING_ACTIVE;
          offerings[1].ServiceFeatures[0].Status = AddOns.SERVICE_FEATURE_STATUS.PENDING_ACTIVE;
          offerings[1].ServiceFeatures[1].Status = AddOns.SERVICE_FEATURE_STATUS.PENDING_ACTIVE;
          expect(AddOns.ExistingPlanQuantitiesByServiceId.resultFunc(offerings, serviceIdLookup)).toEqual({});
        });
      });
    });

    describe('And there are no offers', () => {
      it('Should return empty existing plans', () => {
        offerings = [];
        expect(AddOns.ExistingPlanQuantitiesByServiceId.resultFunc(offerings, serviceIdLookup)).toEqual({});
      });
    });
  });
});
