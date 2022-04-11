import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { getViewGuideNavItem } from '../../../navigation/sitemap.selectors';
import { Client } from '../../client.selectors';
import { SubscriberProductTypes } from '../../products/products.selectors';
import { getCdnLinkFromFullURL, shouldSubscriberSeeContent } from '../cdn.helpers';


const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

const Base = createSelector([
  Client
], (client) => {
  return client.guides;
});

export const Guides = createSelector([
  Base
], (base) => {
  const guides = pathOr([], ['data'], base);
  if (!Array.isArray(guides)) {
    return EMPTY_ARRAY;
  }

  return guides.map((guide) => ({
    id: guide.ID,
    key: pathOr('', ['custom_fields', 'key'], guide),
    name: guide.post_title,
    url: getViewGuideNavItem().url,
    categories: (guide.post_categories || []).map((pc) => pc.term_id),
    tags: guide.post_tags ? guide.post_tags : EMPTY_ARRAY,
    intro: pathOr('', ['custom_fields', 'intro'], guide),
    outro: pathOr('', ['custom_fields', 'outro'], guide),
    relatedArticles: pathOr(EMPTY_ARRAY, ['custom_fields', 'related_post'], guide),
    steps: pathOr(EMPTY_ARRAY, ['custom_fields', 'step'], guide).map((step) => {
      return {
        ...pathOr(EMPTY_OBJECT, ['guide_content'], step),
        image: getCdnLinkFromFullURL(pathOr('', ['guide_content', 'image'], step))
      };
    })
  }));
});

export const GuidesForSubscriberLevel = createSelector([
  Guides,
  SubscriberProductTypes
], (guides, subscriber) => {
  return guides.filter((guide) => {
    return shouldSubscriberSeeContent(subscriber, guide.tags);
  });
});

export const IsGuidesLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});
