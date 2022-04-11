import { WP_TAGS } from '../cdn.helpers';
import * as GeneralArticles from './general.articles.selectors';

const articlesObject = [
  {
    ID: 20,
    post_title: 'Can I pause my service?',
    custom_fields: {
      article: 'This is the article',
      related_post: [5],
      key: 'someKey'
    },
    post_categories: [{
      term_id: 1
    }, {
      term_id: 2
    }],
    post_tags: [{
      name: WP_TAGS.PRIVATE_MOBILE
    }]
  }
];

const normalizedArticlesObject = [
  {
    id: 20,
    name: 'Can I pause my service?',
    content: 'This is the article',
    categories: [1, 2],
    tags: [{
      name: WP_TAGS.PRIVATE_MOBILE
    }],
    relatedArticles: [5],
    url: '/translated/translated',
    key: 'someKey'
  }
];

describe('General Articles ', () => {
  describe('When the GeneralArticles selector is used...', () => {
    test('It should return normalized values for the articles attributes when one exists.', () => {
      expect(GeneralArticles.GeneralArticles.resultFunc({
        data: articlesObject
      })).toEqual(normalizedArticlesObject);
    });
    test('It should return an empty array when no articles object exists.', () => {
      expect(GeneralArticles.GeneralArticles.resultFunc([])).toEqual([]);
    });
  });

  describe('When the GeneralArticlesForSubscriberLevel selector is used...', () => {
    const subscriber = {
      isLoggedIn: true,
      hasMobileOffers: true,
      hasBroadbandOffers: true
    };
    test('It should return the articles that the subscriber can see when one exists.', () => {
      expect(GeneralArticles.GeneralArticlesForSubscriberLevel.resultFunc(normalizedArticlesObject, subscriber))
        .toEqual(normalizedArticlesObject);
    });
    test('It should return an empty array when no article object exists that match the query.', () => {
      subscriber.hasMobileOffers = false;
      expect(GeneralArticles.GeneralArticlesForSubscriberLevel.resultFunc(normalizedArticlesObject, subscriber))
        .toEqual([]);
    });
  });
});
