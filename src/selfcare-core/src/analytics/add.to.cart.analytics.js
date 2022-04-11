import { log } from '@selfcare/core/helpers/log';
import isEmpty from 'ramda/src/isEmpty';
import { createProduct, dataLayerPush } from './analytics.helper';

/**
 * @param {*} existingUser
 * @param {*} campaignId
 * @param {*} optionsViewData
 *
 * @returns {{
    'event': 'addToCart',
    'ecommerce': {
        'add': {
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
const transformOptionsViewDataToAnalyticPayload = (optionsViewData, existingUser, campaignId) => {
  const payload = [];
  const newOrExistingUser = existingUser ? 'Existing' : 'New';
  optionsViewData.forEach((element, index) => {
    payload.push(createProduct(element, index, newOrExistingUser, campaignId));
  });
  // TODO dimension2 => New or Existing User
  return {
    event: 'addToCart',
    ecommerce: {
      add: {
        products: payload
      }
    }
  };
};

/**
 *
 * @param {*} optionsViewData The Elements to use for analytics that comes from the marketingTemplate
 * @param {*} index The index number in the list.
 */
export const addToCartAnalytic = (optionsViewData, existingUser, campaignId) => {
  if (!isEmpty(optionsViewData)) {
    log('ECOMMERCE: Add To Cart Event was received pushed to analytics.');
    const analytic = transformOptionsViewDataToAnalyticPayload(optionsViewData, existingUser, campaignId);
    dataLayerPush(analytic);
    return analytic;
  }
};
