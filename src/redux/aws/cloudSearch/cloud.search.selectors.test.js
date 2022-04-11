import Immutable from 'seamless-immutable';
import { WP_TAGS } from '../cdn.helpers';
import { INITIAL_STATE as generalArticlesInitialState } from '../generalArticles/general.articles.reducer';
import { INITIAL_STATE as cloudSearchInitialState } from './cloud.search.reducer';
import * as CloudSearch from './cloud.search.selectors';

const initializedStore = new Immutable({
  client: {
    cloudSearch: cloudSearchInitialState,
    generalArticles: generalArticlesInitialState
  }
});

describe('CloudSearch ', () => {
  describe('When the CloudSearchData is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = [{
        id: 1
      }];
      const CUSTOM_STATE = initializedStore.setIn(['client', 'cloudSearch', 'searchResults'], DATA);
      expect(CloudSearch.CloudSearchData(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return an empty array when there is no store passed in.', () => {
      expect(CloudSearch.CloudSearchData()).toEqual([]);
    });
  });

  describe('When the CloudSearchIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'cloudSearch', 'isLoading'], true);
      expect(CloudSearch.CloudSearchIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(CloudSearch.CloudSearchIsLoading()).toBe(false);
    });
  });

  describe('When the CloudSearchResults is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = [{
        id: 235,
        fields: {
          article_title: 'Title',
          article_body: 'Description',
          article_type: 'general_articles'
        }
      }];
      const CUSTOM_STATE = initializedStore
        .setIn(['client', 'cloudSearch', 'searchResults'], DATA)
        .setIn(['client', 'generalArticles', 'data', 0], {
          ID: 235,
          post_tags: [{
            name: WP_TAGS.PUBLIC
          }]
        });
      expect(CloudSearch.CloudSearchResults(CUSTOM_STATE)).toEqual([{
        id: DATA[0].id,
        title: DATA[0].fields.article_title,
        description: DATA[0].fields.article_body
      }]);
    });

    test('It should return an empty array when no results exist.', () => {
      expect(CloudSearch.CloudSearchResults(initializedStore)).toEqual([]);
    });
  });
});
