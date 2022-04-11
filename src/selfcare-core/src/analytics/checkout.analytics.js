import isEmpty from 'ramda/src/isEmpty';
import { log } from '../helpers/log';
import { createProduct, dataLayerPush } from './analytics.helper';

/**
 *
 * @param {*} optionsViewData
 *
 * @returns {{
    'event': 'checkout',
    'ecommerce': {
        'checkout': {
            'actionField': {
                'step': '1'
            },
            'products': [{
            'id': ' abc123',
            'name': 'Mobil 3GB',
            'price': '49.00',
            'brand': 'Penny',
            'category': 'Wireless',
            'variant': 'undefined',
            'position': 1,
            'dimension2': 'New'
            'dimension10': '101010101'
    }]
    }
    }
    }} the Analytics Object
    */
const transformOptionsViewDataToAnalyticPayload = (optionsViewData, step, existingUser, campaignId) => {
  const payload = [];
  const newOrExistingUser = existingUser ? 'Existing' : 'New';
  optionsViewData.forEach((element, index) => {
    payload.push(createProduct(element, index, newOrExistingUser, campaignId));
  });
  // TODO aggrregate the quantity properly
  const updatedPayload = payload.map((product) => ({
    ...product,
    quantity: 1
  }));
  return {
    event: 'checkout',
    ecommerce: {
      checkout: {
        actionField: {
          step: String(step)
        },
        products: updatedPayload
      }
    }
  };
};

/**
 *
 * @param {*} optionsViewData The Elements to use for analytics that comes from the marketingTemplate
 * @param {*} index The index number in the list.
 * @param {*} existingUser
 * @param {*} campaignId
*/
export const checkoutAnalytic = (optionsViewData, step, existingUser, campaignId) => {
  if (!isEmpty(optionsViewData)) {
    log('ECOMMERCE: Checkout Event Step:', step, ' was received pushed to analytics.');
    const analytic = transformOptionsViewDataToAnalyticPayload(optionsViewData, step, existingUser, campaignId);
    dataLayerPush(analytic);
    return analytic;
  }
};
