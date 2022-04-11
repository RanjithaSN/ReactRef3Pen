import { decisionOptionViewData } from 'components/shop/decision/decision.options.helper.test.data'; // I know this is bad but its a test
import { log } from '../helpers/log';
import { addToCartAnalytic } from './add.to.cart.analytics';

describe('AddToCart Analytics ', () => {
  describe('When addToCartAnalytic is used...', () => {
    // TODO add tests for mobile and bundle, play??
    test('It should create a addToCart event from an element correctly', () => {
      const analytic = addToCartAnalytic(decisionOptionViewData);
      log(analytic);
      expect(analytic).toEqual({
        event: 'addToCart',
        ecommerce: {
          add: {
            products: [{
              id: 37303,
              name: 'Mobil 3GB',
              price: '49.00',
              brand: 'Penny',
              category: 'Mobil',
              variant: 'undefined',
              position: 1,
              dimension2: 'New',
              dimension10: 'undefined'
            }, {
              id: 38203,
              name: 'Mobil 8GB',
              price: '69.00',
              brand: 'Penny',
              category: 'Mobil',
              variant: 'undefined',
              position: 2,
              dimension2: 'New',
              dimension10: 'undefined'
            }, {
              id: 37284,
              name: 'Mobil 15GB',
              price: '99.00',
              brand: 'Penny',
              category: 'Mobil',
              variant: 'undefined',
              position: 3,
              dimension2: 'New',
              dimension10: 'undefined'
            }, {
              id: 37285,
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
        }
      });
    });
  });
});
