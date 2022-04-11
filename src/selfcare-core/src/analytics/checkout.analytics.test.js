import { decisionOptionViewData } from 'components/shop/decision/decision.options.helper.test.data'; // I know this is bad but its a test
import { checkoutAnalytic } from './checkout.analytics';

describe('Checkout Analytics ', () => {
  describe('When checkoutAnalytic is used...', () => {
    test('It should create a checkout event from a simple order correctly', () => {
      const analytic = checkoutAnalytic(decisionOptionViewData, 1);
      // log(JSON.stringify(analytic, null, 4));
      expect(analytic).toEqual({
        event: 'checkout',
        ecommerce: {
          checkout: {
            actionField: {
              step: '1'
            },
            products: [
              {
                id: 37303,
                name: 'Mobil 3GB',
                price: '49.00',
                brand: 'Penny',
                category: 'Mobil',
                variant: 'undefined',
                position: 1,
                dimension2: 'New',
                quantity: 1,
                dimension10: 'undefined'
              },
              {
                id: 38203,
                name: 'Mobil 8GB',
                price: '69.00',
                brand: 'Penny',
                category: 'Mobil',
                variant: 'undefined',
                position: 2,
                dimension2: 'New',
                quantity: 1,
                dimension10: 'undefined'
              },
              {
                id: 37284,
                name: 'Mobil 15GB',
                price: '99.00',
                brand: 'Penny',
                category: 'Mobil',
                variant: 'undefined',
                position: 3,
                dimension2: 'New',
                quantity: 1,
                dimension10: 'undefined'
              },
              {
                id: 37285,
                name: 'Mobil 40GB',
                price: '139.00',
                brand: 'Penny',
                category: 'Mobil',
                variant: 'undefined',
                position: 4,
                dimension2: 'New',
                quantity: 1,
                dimension10: 'undefined'
              }
            ]
          }
        }
      });
    });
  });
});
