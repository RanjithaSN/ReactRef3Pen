import { findPageByUrl } from '../navigation/sitemap.selectors';

/**
* Get location uid based on pathname
*
* @param {string} location - location pathname (like: account/payments)
* @returns {object} page - object with location information, as seen in sitemap.js
*/
export const getLocationInfo = (location) => {
  return location === '/' ?
    {
      uid: 'home'
    } :
    findPageByUrl(location);
};

/**
 * Get pages object to put in 'In-Account Help' store state
 *
 * @param {string} page - string with the uid for the page with format like: account/payments
 * @return {object} - object with pages with format { page1: '', page2: '', page3: '' }
 */
export const getPages = (page) => {
  if (page) {
    const pages = page.split('/');
    const result = {
      page1: '',
      page2: '',
      page3: ''
    };

    pages.forEach((item, index) => {
      const parsed = parseInt(item, 10);

      result[`page${index + 1}`] = Number.isNaN(parsed) ?
        item :
        '';
    });

    return result;
  }

  return {};
};

/**
* Get product category for in account help context page
*
* @param {object} product - product object with properties for category matching
* @returns {string} - string with category of product for api usage (mobile/broadband/play)
*/
export const getProductCategory = (product) => {
  if (product.isWireless) {
    return 'mobile';
  }

  if (product.isBroadband) {
    return 'broadband';
  }

  if (product.isPennyPlay) {
    return 'play';
  }

  return '';
};

/**
* Get context page object data, structured to set state of defined page number and string
*
* @param {number} page - page number to be set
* @param {string} info - string information to be set in given page number
* @returns {object} - object with information structured for reducer to set page data
*/
export const getContextPageObject = (page, info = '') => {
  return {
    pageNumber: page,
    pageInfo: info
  };
};

export const LIMIT_FOR_URL_INFO_FROM_ROUTER = 4;
