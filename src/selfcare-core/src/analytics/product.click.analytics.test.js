import { productClickAnalytic } from './product.click.analytics';

describe('ProductClick Analytics ', () => {
  describe('When productClick is used...', () => {
    // TODO add tests for mobile and bundle, play??
    test('It should create a productClick event from an element correctly', () => {
      const element = {
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
          price: 49,
          category: 'Mobil',
          list: 'Mobile'
        }
      };
      const analytic = productClickAnalytic(element, 1);
      expect(analytic).toEqual({
        event: 'productClick',
        ecommerce: {
          click: {
            actionField: {
              list: 'Mobile'
            },
            products: [{
              id: 321321,
              name: 'Mobil 3GB',
              price: '49.00',
              brand: 'Penny',
              category: 'Mobil',
              variant: 'undefined',
              position: 2,
              dimension2: 'New',
              dimension10: 'undefined'
            }]
          }
        }
      });
    });
  });
});
