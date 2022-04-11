import { transactionEventFromOrder, transformItemToTransactionProduct } from '@selfcare/core/analytics/transaction.analytics';
import { multipleBillingChargesItem, multipleDiscountsItem, simpleItem, simpleOrder } from '@selfcare/core/analytics/transaction.analytics.test.data';

describe('Checkout helpers ', () => {
  describe('When transformItemToTransactionProduct is used...', () => {
    test('It should transform a simple item correctly', () => {
      expect(transformItemToTransactionProduct(simpleItem)).toEqual({
        id: 724307,
        name: 'TEST Mobil Data',
        price: '99.00',
        category: 'Wireless',
        quantity: 1,
        dimension2: 1
      });
    });

    test('It should transform an item with multiple billings correctly', () => {
      expect(transformItemToTransactionProduct(multipleBillingChargesItem)).toEqual({
        id: 724307,
        name: 'TEST Mobil Data',
        price: '397.00',
        category: 'Wireless',
        quantity: 1,
        dimension2: 1
      });
    });

    test('It should transform an item with multiple discounts correctly', () => {
      expect(transformItemToTransactionProduct(multipleDiscountsItem)).toEqual({
        id: 724307,
        name: 'TEST Mobil Data',
        price: '447.00',
        category: 'Wireless',
        quantity: 1,
        dimension2: 1
      });
    });
  });

  describe('When transactionEventFromOrder is used...', () => {
    test('It should create a transaction even from a simple order correctly', () => {
      expect(transactionEventFromOrder(simpleOrder)).toEqual({
        event: 'transaction',
        ecommerce: {
          purchase: {
            actionField: {
              id: '18274474',
              revenue: '49.00',
              tax: 0,
              coupon: ''
            },
            products: [{
              id: 716537,
              name: 'Mobil Connection',
              price: '0.00',
              category: 'Wireless',
              quantity: 1,
              dimension2: 1
            }, {
              id: 717123,
              name: 'Mobil SMS',
              price: '0.00',
              category: 'Wireless',
              quantity: 1,
              dimension2: 1
            }, {
              id: 717124,
              name: 'Mobil Voice',
              price: '0.00',
              category: 'Wireless',
              quantity: 1,
              dimension2: 1
            }, {
              id: 724307,
              name: 'TEST Mobil Data',
              price: '49.00',
              category: 'Wireless',
              quantity: 1,
              dimension2: 1
            }]
          }
        },
        shippingMethod: 'mail'
      });
    });

    test('It should create a transaction event from an order with duplicate products correctly', () => {
      expect(transactionEventFromOrder({
        ...simpleOrder,
        Items: [...simpleOrder.Items, ...simpleOrder.Items]
      })).toEqual({
        event: 'transaction',
        ecommerce: {
          purchase: {
            actionField: {
              id: '18274474',
              revenue: '98.00',
              tax: 0,
              coupon: ''
            },
            products: [{
              id: 716537,
              name: 'Mobil Connection',
              price: '0.00',
              category: 'Wireless',
              quantity: 2,
              dimension2: 1
            }, {
              id: 717123,
              name: 'Mobil SMS',
              price: '0.00',
              category: 'Wireless',
              quantity: 2,
              dimension2: 1
            }, {
              id: 717124,
              name: 'Mobil Voice',
              price: '0.00',
              category: 'Wireless',
              quantity: 2,
              dimension2: 1
            }, {
              id: 724307,
              name: 'TEST Mobil Data',
              price: '49.00',
              category: 'Wireless',
              quantity: 2,
              dimension2: 1
            }]
          }
        },
        shippingMethod: 'mail'
      });
    });
  });
});
