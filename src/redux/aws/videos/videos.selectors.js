import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { getViewVideoNavItem } from '../../../navigation/sitemap.selectors';
import { Client } from '../../client.selectors';
import { SubscriberProductTypes } from '../../products/products.selectors';
import { getCdnLinkFromFullURL, shouldSubscriberSeeContent } from '../cdn.helpers';


const EMPTY_ARRAY = [];

const Base = createSelector([
  Client
], (client) => {
  return client.videos;
});

export const Videos = createSelector([
  Base
], (base) => {
  const videos = pathOr([], ['data'], base);
  if (!Array.isArray(videos)) {
    return EMPTY_ARRAY;
  }

  return videos.map((video) => ({
    id: video.ID,
    key: pathOr(null, ['custom_fields', 'key'], video),
    name: video.post_title,
    url: getViewVideoNavItem().url,
    categories: (video.post_categories || EMPTY_ARRAY).map((pc) => pc.term_id),
    tags: video.post_tags ? video.post_tags : EMPTY_ARRAY,
    intro: pathOr('', ['custom_fields', 'article'], video),
    relatedArticles: pathOr([], ['custom_fields', 'related_post'], video),
    video: getCdnLinkFromFullURL(pathOr('', ['custom_fields', 'video'], video))
  }));
});

export const VideosForSubscriberLevel = createSelector([
  Videos,
  SubscriberProductTypes
], (videos, subscriber) => {
  return videos.filter((video) => {
    return shouldSubscriberSeeContent(subscriber, video.tags);
  });
});

export const IsVideosLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});
