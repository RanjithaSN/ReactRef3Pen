import { log } from '@selfcare/core/helpers/log';
import { createProduct, dataLayerPush } from './analytics.helper';

/**
 *
 * @param {*} element
 * @param {*} index
 *
 * @returns {{
    'event': 'productClick',
    'ecommerce': {
    'click': {
    'actionField': {
    'list': 'Mobile'
    },
    'products': [{
    'id': ' abc123',
    'name': 'Mobil 3GB',
    'price': '49.00',
    'brand': 'Penny',
    'category': 'Wireless',
    'variant': 'undefined',
    'position': 1,
    'dimension10': '101010101'
    }]
    }
    }
    }} the Analytics Object
     */
const createProductClickAnalytic = (element, index, existingUser) => {
  const newOrExistingUser = existingUser ? 'Existing' : 'New';
  return {
    event: 'productClick',
    ecommerce: {
      click: {
        actionField: {
          list: element.sizeDisplayData.list
        },
        products: [
          createProduct(element, index, newOrExistingUser)
        ]
      }
    }
  };
};

/**
 *
 * @param {{
'beforeDiscount': 99,
'cost': 49,
'currencyCode': "SEK",
'currencyLocale': "sv-SE",
'id': "2011137828075000103",
'sizeDisplayData': {
    'data': "3GB",
    'description': "Musik och Surf",
    'download': null,
    'name': "Mobil 3GB",
    'price': "99,00 Kr"}
}} element The Element to use for analytics (something with an onClick)
 * @param {*} index The index number in the list.
 */
export const productClickAnalytic = (element, index, existingUser) => {
  if (element && element.sizeDisplayData && element.sizeDisplayData.name) {
    log(`Product Click Event - Element ID ${element.id} - was received pushed to analytics.`);
    const analytic = createProductClickAnalytic(element, index, existingUser);
    dataLayerPush(analytic);
    return analytic;
  }
};
