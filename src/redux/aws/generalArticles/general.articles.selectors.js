import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { getViewArticleNavItem } from '../../../navigation/sitemap.selectors';
import { Client } from '../../client.selectors';
import { SubscriberProductTypes } from '../../products/products.selectors';
import { sanitizeArticleContent, shouldSubscriberSeeContent } from '../cdn.helpers';

const EMPTY_ARRAY = [];

const Base = createSelector([
  Client
], (client) => {
  return client.generalArticles;
});

export const GeneralArticles = createSelector([
  Base
], (base) => {
  const archivedArticles = pathOr([], ['data'], base);
  if (!Array.isArray(archivedArticles)) {
    return EMPTY_ARRAY;
  }

  return archivedArticles.map((article) => ({
    id: article.ID,
    key: pathOr('', ['custom_fields', 'key'], article),
    name: article.post_title,
    url: getViewArticleNavItem().url,
    content: sanitizeArticleContent(pathOr('', ['custom_fields', 'article'], article)),
    tags: article.post_tags ? article.post_tags : EMPTY_ARRAY,
    categories: (article.post_categories || EMPTY_ARRAY).map((pc) => pc.term_id),
    relatedArticles: pathOr(EMPTY_ARRAY, ['custom_fields', 'related_post'], article)
  }));
});

export const GeneralArticlesForSubscriberLevel = createSelector([
  GeneralArticles,
  SubscriberProductTypes
], (articles, subscriberOfferTypes) => {
  return articles.filter((article) => {
    return shouldSubscriberSeeContent(subscriberOfferTypes, article.tags);
  });
});
