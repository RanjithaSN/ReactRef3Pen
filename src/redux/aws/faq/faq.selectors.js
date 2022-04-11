import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Client } from '../../client.selectors';

const EMPTY_ARRAY = [];

const Base = createSelector([
  Client
], (client) => {
  return client.faq;
});

export const GetFaqs = createSelector([
  Base
], (faq) => {
  const archivedFaqs = pathOr([], ['data'], faq);
  if (!Array.isArray(archivedFaqs)) {
    return EMPTY_ARRAY;
  }

  return archivedFaqs.map((archivedFaq) => {
    return {
      answer: pathOr('', ['custom_fields', 'answer'], archivedFaq),
      categories: (archivedFaq.post_categories || EMPTY_ARRAY).map((pc) => pc.slug),
      id: archivedFaq.ID,
      relatedArticle: pathOr(null, ['custom_fields', 'related_article', 'ID'], archivedFaq),
      title: archivedFaq.post_title,
      uri: archivedFaq.post_uri
    };
  });
});

export const IsFaqsLoading = createSelector([
  Base
], (faq) => {
  return faq.isLoading;
});

export const IsFaqsLoaded = createSelector([
  Base
], (faq) => {
  return faq.isLoaded;
});
