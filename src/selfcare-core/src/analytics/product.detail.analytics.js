import { log } from '@selfcare/core/helpers/log';
import isEmpty from 'ramda/src/isEmpty';
import { createProduct, dataLayerPush } from './analytics.helper';


/**
 *
 * @param {*} optionsViewData
 *
 * @returns {{
    'event': 'productDetail',
    'ecommerce': {
        'detail': {
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
const transformOptionsViewDataToAnalyticPayload = (optionsViewData, existingUser, campaignId) => {
  const payload = [];
  const newOrExistingUser = existingUser ? 'Existing' : 'New';
  optionsViewData.forEach((element, index) => {
    payload.push(createProduct(element, index, newOrExistingUser, campaignId));
  });
  // TODO dimension2 => New or Existing User
  // TODO add index to support what index this product is in the array on the screen, currently not implementable.
  return {
    event: 'productDetail',
    ecommerce: {
      detail: {
        actionField: {
          list: optionsViewData[0].sizeDisplayData.list
        },
        products: payload
      }
    }
  };
};


/**
 *
 * @param {*} optionsViewData The Elements to use for analytics that comes from the marketingTemplate
 * @param {*} existingUser
 * @param {*} campaignId
 */
export const productDetailAnalytic = (optionsViewData, existingUser, campaignId) => {
  if (!isEmpty(optionsViewData)) {
    log('ECOMMERCE: Product Detail Event was received pushed to analytics.');
    const analytic = transformOptionsViewDataToAnalyticPayload(optionsViewData, existingUser, campaignId);
    dataLayerPush(analytic);
    return analytic;
  }
};
