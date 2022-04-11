import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['catalog'], subscriberApi);
});

export const CatalogData = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const CatalogSearchResults = createSelector([
  CatalogData
], (data) => {
  const searchResults = pathOr(EMPTY_ARRAY, ['SearchResults'], data);
  const products = pathOr(null, ['Products'], data);

  return searchResults.map(({ Id, ...props }) => ({
    Id: +Id,
    ...props,
    ThumbnailUrl: pathOr(null, [+Id, 'ThumbnailUrl'], products)
  }));
});
