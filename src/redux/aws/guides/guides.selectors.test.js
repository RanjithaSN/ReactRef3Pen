import { WP_TAGS } from '../cdn.helpers';
import * as Guides from './guides.selectors';

const guidesObject = [{
  ID: 20,
  post_title: 'Can I pause my service?',
  custom_fields: {
    intro: 'This is the article',
    outro: 'That was the article',
    related_post: [5],
    step: [{
      guide_content: {
        stuff: 'Step 1',
        image: 'www.somesite/uploads/asdf?asdf'
      }
    }, {
      guide_content: {
        stuff: 'Step 2'
      }
    }],
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
}];

const normalizedGuidesObject = [{
  id: 20,
  name: 'Can I pause my service?',
  intro: 'This is the article',
  outro: 'That was the article',
  url: '/translated/translated',
  categories: [1, 2],
  tags: [{
    name: WP_TAGS.PRIVATE_MOBILE
  }],
  relatedArticles: [5],
  steps: [{
    stuff: 'Step 1',
    image: '/media/uploads/asdf'
  }, {
    stuff: 'Step 2',
    image: ''
  }],
  key: 'someKey'
}];

describe('Guides ', () => {
  xdescribe('When the Guides selector is used...', () => {
    test('It should return normalized values for the guides when one exists.', () => {
      expect(Guides.Guides.resultFunc({
        data: guidesObject
      })).toEqual(normalizedGuidesObject);
    });
    test('It should return an empty array when no articles object exists.', () => {
      expect(Guides.Guides.resultFunc([])).toEqual([]);
    });
  });

  describe('When the GuidesForSubscriberLevel selector is used...', () => {
    const subscriber = {
      isLoggedIn: true,
      hasMobileOffers: true,
      hasBroadbandOffers: true
    };
    test('It should return the guides that the subscriber can see when one exists.', () => {
      expect(Guides.GuidesForSubscriberLevel.resultFunc(normalizedGuidesObject, subscriber))
        .toEqual(normalizedGuidesObject);
    });
    test('It should return an empty array when no guide object exists that match the query.', () => {
      subscriber.hasMobileOffers = false;
      expect(Guides.GuidesForSubscriberLevel.resultFunc(normalizedGuidesObject, subscriber))
        .toEqual([]);
    });
  });

  describe('When the IsGuidesLoading selector is used...', () => {
    test('It should return true when the state has isLoading set to true.', () => {
      expect(Guides.IsGuidesLoading.resultFunc({
        isLoading: true
      })).toEqual(true);
    });
    test('It should return false when the state has isLoading set to false.', () => {
      expect(Guides.IsGuidesLoading.resultFunc({
        isLoading: false
      })).toEqual(false);
    });
  });
});
