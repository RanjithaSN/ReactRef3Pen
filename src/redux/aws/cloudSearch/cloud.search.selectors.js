
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Client } from '../../client.selectors';
import { SubscriberProductTypes } from '../../products/products.selectors';
import { shouldSubscriberSeeContent, WP_POST_TYPES } from '../cdn.helpers';
import { GeneralArticles } from '../generalArticles/general.articles.selectors';
import { Guides } from '../guides/guides.selectors';
import { Videos } from '../videos/videos.selectors';

const Base = createSelector(
  Client,
  (client) => pathOr(null, ['cloudSearch'], client)
);

export const CloudSearchData = createSelector([
  Base
], (base) => {
  return pathOr([], ['searchResults'], base);
});

export const CloudSearchIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const CloudSearchResults = createSelector([
  CloudSearchData,
  SubscriberProductTypes,
  GeneralArticles,
  Guides,
  Videos
], (data, subscriberProductTypes, generalArticles, guides, videos) => {
  return data.filter((searchResult) => {
    const articleType = pathOr('', ['fields', 'article_type'], searchResult);
    const lookupById = (article) => article.id === parseInt(searchResult.id, 10);

    let linkedArticle;
    if (articleType === WP_POST_TYPES.GENERAL_ARTICLES) {
      linkedArticle = generalArticles.find(lookupById);
    } else if (articleType === WP_POST_TYPES.GUIDES) {
      linkedArticle = guides.find(lookupById);
    } else if (articleType === WP_POST_TYPES.VIDEOS) {
      linkedArticle = videos.find(lookupById);
    }

    return linkedArticle && shouldSubscriberSeeContent(subscriberProductTypes, linkedArticle.tags, true);
  }).map((result) => {
    return {
      id: result.id,
      title: result.fields.article_title,
      description: result.fields.article_body
    };
  });
});
