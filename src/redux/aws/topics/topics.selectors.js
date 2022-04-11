import { createSelector } from 'reselect';
import { GeneralArticlesForSubscriberLevel } from '../generalArticles/general.articles.selectors';
import { GuidesForSubscriberLevel } from '../guides/guides.selectors';
import { VideosForSubscriberLevel } from '../videos/videos.selectors';

export const ArticlesForSubscriberLevel = createSelector([
  GeneralArticlesForSubscriberLevel,
  GuidesForSubscriberLevel,
  VideosForSubscriberLevel
], (generalArticles, guides, videos) => [...generalArticles, ...guides, ...videos].sort((a, b) => {
  return a.name.localeCompare(b.name);
}));
