import Immutable from 'seamless-immutable';
import { OFFER_TYPES } from '../searchOffers/search.offers.constants';
import * as MarketingTemplates from './marketing.templates.selectors';

const baseMarketingTemplateType = Immutable([{
  AdditionalProperties: {
    AttributeIds: '1,2,3,4'
  },
  Description: 'This is a type',
  Name: 'Featured Offers',
  Value: '1234'
}]);

const initializedStore = new Immutable({
  ascendon: {
    metadata: {
      codes: {
        // MarketingTemplateType
        432: {
          isLoaded: true,
          items: baseMarketingTemplateType
        },
        // MarketingTemplateTypeAttribute
        433: {
          isLoaded: true,
          items: [{
            AdditionalProperties: {},
            Name: 'Col1Header',
            Value: '1'
          }, {
            AdditionalProperties: {},
            Name: 'Col2Header',
            Value: '2'
          }, {
            AdditionalProperties: {},
            Name: 'Col3Header',
            Value: '3'
          }, {
            AdditionalProperties: {},
            Name: 'Col4Header',
            Value: '4'
          }]
        }
      }
    },
    preferences: {
      selectedDisplayLanguage: 'en-US'
    },
    settings: {
      selectedOfferType: OFFER_TYPES.STANDARD
    },
    subscriberApi: {
      offering: {
        data: {
          Offerings: [{
            Id: 12341234,
            Name: 'Offer Name',
            Weight: 1,
            ShortDescription: 'This is the offer description',
            CurrencyCode: 'CAD',
            Amount: 123.33,
            OfferType: OFFER_TYPES.STANDARD,
            MarketingViews: [{
              AttributeValues: [{
                AttributeId: '4',
                Value: 'Should be column 4'
              }, {
                AttributeId: '2',
                Value: 'Should be column 2'
              }, {
                AttributeId: '3',
                Value: 'Should be column 3'
              }, {
                AttributeId: '1',
                Value: 'Should be column 1'
              }],
              MarketingTemplateTypeCode: '1234'
            }]
          }],
          Subscription: {
            Id: '123',
            Cycle: 2,
            CycleDate: '2018-12-23T22:08:26.370Z',
            RenewAmount: 123.33,
            Status: 1
          },
          Options: []
        }
      },
      subscription: {
        123: {
          Id: '123',
          OfferingId: 12341234,
          PaymentInstrument: {
            Name: 'Visa',
            ExpirationMonth: '03',
            ExpirationYear: '2020'
          },
          Items: []
        }
      }
    }
  }
});

describe('MarketingTemplates ', () => {
  describe('When the MarketingTemplatesWithMappedAttributes is used...', () => {
    test('It should return the formatted object if types and attributes metadata both exist.', () => {
      const labels = [{
        id: '1',
        label: 'Col1Header'
      }, {
        id: '2',
        label: 'Col2Header'
      }, {
        id: '3',
        label: 'Col3Header'
      }, {
        id: '4',
        label: 'Col4Header'
      }];
      const EXPECTED = [baseMarketingTemplateType[0].set('labels', labels)];
      expect(MarketingTemplates.MarketingTemplatesWithMappedAttributes(initializedStore)).toEqual(EXPECTED);
    });

    test('It should return an empty array when types(432) doesnt exist.', () => {
      const NO_METADATA_CODE = initializedStore.setIn(['ascendon', 'metadata', 'codes', 432, 'items'], []);
      expect(MarketingTemplates.MarketingTemplatesWithMappedAttributes(NO_METADATA_CODE)).toEqual([]);
    });

    test('It should return an empty array when attributes(433) doesnt exist.', () => {
      const NO_METADATA_CODE = initializedStore.setIn(['ascendon', 'metadata', 'codes', 433, 'items'], []);
      expect(MarketingTemplates.MarketingTemplatesWithMappedAttributes(NO_METADATA_CODE)).toEqual([]);
    });
  });

  describe('When the MarketingTemplatesBasedOnOffers is used...', () => {
    test('It should return offers when 433 metadata code doesnt exist.', () => {
      const NO_METADATA_CODE = initializedStore.setIn(['ascendon', 'codes', 433, 'items'], []);
      expect(MarketingTemplates.MarketingTemplatesBasedOnOffers(NO_METADATA_CODE).length).toEqual(1);
    });

    test('It should return offers when 432 metadata code doesnt exist.', () => {
      const NO_METADATA_CODE = initializedStore.setIn(['ascendon', 'codes', 432, 'items'], []);
      expect(MarketingTemplates.MarketingTemplatesBasedOnOffers(NO_METADATA_CODE).length).toEqual(1);
    });
  });
});
