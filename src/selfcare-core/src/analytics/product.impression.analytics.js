import { log } from '@selfcare/core/helpers/log';
import { createProduct, dataLayerPush } from './analytics.helper';

/**
 *
 * @param {*} elements
 *
 * @returns {{
    'event': 'productImpression',
    'ecommerce': {
    'impressions': [{
    'id': ' abc123',
    'name': 'Broadband 100/10',
    'price': ' 199.00',
    'brand': 'Penny',
    'category': 'Broadband',
    'variant': 'undefined',
    'list': 'Bundle',
    'position': 1,
    'dimension10': '1010101010'
    }, {
    'id': ' def123',
    'name': 'Mobil 3GB',
    'price': ' 49.00',
    'brand': 'Penny',
    'category': 'Wireless',
    'variant': 'undefined',
    'list': 'Bundle',
    'position': 1,
    'dimension10': '1010101010'
    }]
    }
   }} Product Impressions Array
    */
const createProductImpressionsAnalytic = (elements, existingUser) => {
  const impressions = [];
  const newOrExistingUser = existingUser ? 'Existing' : 'New';
  elements.forEach((element, index) => {
    impressions.push(createProduct(element, index, newOrExistingUser));
  });
  return {
    event: 'productImpression',
    ecommerce: {
      impressions
    }
  };
};

/**
 *
 * @param {*} decisionViewData
 * @see decision.options.helper.js
 */
export const productImpressionsAnalyticFromViewData = (decisionViewData, existingUser) => {
  if (decisionViewData && decisionViewData.length && decisionViewData[0].sizeDisplayData && decisionViewData[0].sizeDisplayData.name) {
    const analytic = createProductImpressionsAnalytic(decisionViewData, existingUser);
    if (analytic) {
      log('ECOMMERCE: ProductImpressions Event was received pushed to analytics.');
      dataLayerPush(analytic);
      return analytic;
    }
  }
};
