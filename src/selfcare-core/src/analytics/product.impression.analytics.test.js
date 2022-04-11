import { productImpressionsAnalyticFromViewData } from './product.impression.analytics';

describe('ProductImpression Analytics ', () => {
  describe('When productImpression is used...', () => {
    // TODO add tests for mobile and bundle, play??
    test('It should create a productImpression event from an element correctly', () => {
      const viewData = [
        {
          beforeDiscount: 99,
          cost: 49,
          currencyCode: 'SEK',
          currencyLocale: 'sv-SE',
          id: '2011137828075000103',
          pricingPlanId: 321321,
          sizeDisplayData: {
            data: '3GB',
            description: 'Musik och Surf',
            download: null,
            name: 'Mobil 3GB',
            price: '99,00 Kr',
            category: 'Mobil',
            list: 'Mobile'
          }
        },
        {
          beforeDiscount: 149,
          cost: 69,
          currencyCode: 'SEK',
          currencyLocale: 'sv-SE',
          id: '2011825171712000100',
          pricingPlanId: 321322,
          sizeDisplayData: {
            data: '8GB',
            description: 'Musik och Surf',
            download: null,
            name: 'Mobil 8GB',
            price: '149,00 Kr',
            category: 'Mobil',
            list: 'Mobile'
          }
        },
        {
          beforeDiscount: 199,
          cost: 99,
          currencyCode: 'SEK',
          currencyLocale: 'sv-SE',
          id: '2011137828075000101',
          pricingPlanId: 321323,
          sizeDisplayData: {
            data: '15GB',
            description: 'Musik och Surf',
            download: null,
            name: 'Mobil 15GB',
            price: '199,00 Kr',
            category: 'Mobil',
            list: 'Mobile'
          }
        },
        {
          beforeDiscount: 289,
          cost: 139,
          currencyCode: 'SEK',
          currencyLocale: 'sv-SE',
          id: '2011137828075000102',
          pricingPlanId: 321324,
          sizeDisplayData: {
            data: '40GB',
            description: 'Musik och Surf',
            download: null,
            name: 'Mobil 40GB',
            price: '289,00 Kr',
            category: 'Mobil',
            list: 'Mobile'
          }
        }

      ];
      const analytic = productImpressionsAnalyticFromViewData(viewData);
      expect(analytic).toEqual({
        event: 'productImpression',
        ecommerce: {
          impressions: [{
            id: 321321,
            name: 'Mobil 3GB',
            price: '49.00',
            brand: 'Penny',
            category: 'Mobil',
            variant: 'undefined',
            position: 1,
            dimension2: 'New',
            dimension10: 'undefined'
          }, {
            id: 321322,
            name: 'Mobil 8GB',
            price: '69.00',
            brand: 'Penny',
            category: 'Mobil',
            variant: 'undefined',
            position: 2,
            dimension2: 'New',
            dimension10: 'undefined'
          }, {
            id: 321323,
            name: 'Mobil 15GB',
            price: '99.00',
            brand: 'Penny',
            category: 'Mobil',
            variant: 'undefined',
            position: 3,
            dimension2: 'New',
            dimension10: 'undefined'
          }, {
            id: 321324,
            name: 'Mobil 40GB',
            price: '139.00',
            brand: 'Penny',
            category: 'Mobil',
            variant: 'undefined',
            position: 4,
            dimension2: 'New',
            dimension10: 'undefined'
          }
          ]
        }
      });
    });
  });
});
