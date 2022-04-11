import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Client } from '../../client.selectors';
import { SubscriberProductTypes } from '../../products/products.selectors';
import { shouldSubscriberSeeContent } from '../cdn.helpers';

const EMPTY_ARRAY = [];

const Base = createSelector([
  Client
], (client) => {
  return client.categories;
});

export const CategoriesAndTopics = createSelector([
  Base
], (base) => {
  const archivedCategories = pathOr([], ['data'], base);
  if (!Array.isArray(archivedCategories)) {
    return EMPTY_ARRAY;
  }

  return archivedCategories.map((archivedCategory) => ({
    description: archivedCategory.description,
    id: archivedCategory.cat_ID,
    name: archivedCategory.name,
    parent: archivedCategory.category_parent,
    slug: archivedCategory.slug,
    tag: archivedCategory.tag
  }));
});

export const Categories = createSelector([
  CategoriesAndTopics,
  SubscriberProductTypes
], (categories, subscriber) => {
  return categories.filter((category) => {
    return !category.parent && shouldSubscriberSeeContent(subscriber, category.tag);
  });
});

export const Topics = createSelector([
  CategoriesAndTopics,
  SubscriberProductTypes
], (categories, subscriber) => {
  return categories.filter((category) => {
    return !!category.parent && shouldSubscriberSeeContent(subscriber, category.tag);
  });
});

export const IsCategoriesLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});
