import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Client } from '../../client.selectors';
import { getCdnLinkFromFullURL, mapUSPObjectPropsToArray, sanitizeArticleContent } from '../cdn.helpers';

const EMPTY_ARRAY = [];

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['aboutPages'], client);
});


export const GetAboutPages = createSelector([
  Base
], (base) => {
  const archivedAboutPages = pathOr([], ['data'], base);
  if (!Array.isArray(archivedAboutPages)) {
    return EMPTY_ARRAY;
  }
  return archivedAboutPages.map((aboutPage) => ({
    id: aboutPage.ID,
    name: aboutPage.post_title,
    key: path(['custom_fields', 'key'], aboutPage),
    hero: {
      actionLabel: path(['custom_fields', 'hero', 'action_label'], aboutPage),
      actionLink: path(['custom_fields', 'hero', 'action_link'], aboutPage),
      header: sanitizeArticleContent(path(['custom_fields', 'hero', 'header'], aboutPage)),
      heroImage: getCdnLinkFromFullURL(path(['custom_fields', 'hero', 'hero_image'], aboutPage))
    },
    information: path(['custom_fields', 'information'], aboutPage),
    marketingCallouts: [
      {
        title: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_1', 'title'], aboutPage)),
        content: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_1', 'content'], aboutPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['custom_fields', 'marketing_callout_1', 'image_url'], aboutPage)),
        actionLabel: pathOr('', ['custom_fields', 'marketing_callout_1', 'action_label'], aboutPage),
        actionLink: pathOr('', ['custom_fields', 'marketing_callout_1', 'action_link'], aboutPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_2', 'title'], aboutPage)),
        content: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_2', 'content'], aboutPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['custom_fields', 'marketing_callout_2', 'image_url'], aboutPage)),
        actionLabel: pathOr('', ['custom_fields', 'marketing_callout_2', 'action_label'], aboutPage),
        actionLink: pathOr('', ['custom_fields', 'marketing_callout_2', 'action_link'], aboutPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_3', 'title'], aboutPage)),
        content: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_3', 'content'], aboutPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['custom_fields', 'marketing_callout_3', 'image_url'], aboutPage)),
        actionLabel: pathOr('', ['custom_fields', 'marketing_callout_3', 'action_label'], aboutPage),
        actionLink: pathOr('', ['custom_fields', 'marketing_callout_3', 'action_link'], aboutPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_4', 'title'], aboutPage)),
        content: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_4', 'content'], aboutPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['custom_fields', 'marketing_callout_4', 'image_url'], aboutPage)),
        actionLabel: pathOr('', ['custom_fields', 'marketing_callout_4', 'action_label'], aboutPage),
        actionLink: pathOr('', ['custom_fields', 'marketing_callout_4', 'action_link'], aboutPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_5', 'title'], aboutPage)),
        content: sanitizeArticleContent(pathOr('', ['custom_fields', 'marketing_callout_5', 'content'], aboutPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['custom_fields', 'marketing_callout_5', 'image_url'], aboutPage)),
        actionLabel: pathOr('', ['custom_fields', 'marketing_callout_5', 'action_label'], aboutPage),
        actionLink: pathOr('', ['custom_fields', 'marketing_callout_5', 'action_link'], aboutPage)
      }
    ].filter(({ title }) => title),
    crossSellUpsellSection: {
      header: sanitizeArticleContent(pathOr('', ['custom_fields', 'cross-sell_upsell_section', 'header'], aboutPage)),
      description: pathOr('', ['custom_fields', 'cross-sell_upsell_section', 'description'], aboutPage),
      heroImage: getCdnLinkFromFullURL(pathOr('', ['custom_fields', 'cross-sell_upsell_section', 'hero_image'], aboutPage)),
      actionLink: pathOr('', ['custom_fields', 'cross-sell_upsell_section', 'action_link'], aboutPage)
    },
    offerDetails: sanitizeArticleContent(path(['custom_fields', 'offer_details'], aboutPage)),
    productInformation: mapUSPObjectPropsToArray(path(['custom_fields', 'product_information'], aboutPage)),
    productsMoreInformation: path(['custom_fields', 'products_more_information'], aboutPage)
  }));
});

export const IsAboutPagesLoading = createSelector([
  Base
], (base) => {
  return base.isLoading;
});

export const IsAboutPagesLoaded = createSelector([
  Base
], (base) => {
  return base.isLoaded;
});
