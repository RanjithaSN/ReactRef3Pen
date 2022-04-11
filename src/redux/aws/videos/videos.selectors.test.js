import { WP_TAGS } from '../cdn.helpers';
import * as Videos from './videos.selectors';

const videosObject = [{
  ID: 20,
  post_title: 'Can I pause my service?',
  custom_fields: {
    article: 'This is the article',
    related_post: [5],
    video: 'some URL/uploads/superCoolUrlMrTest?hahaThisIsDumb',
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

const normalizedVideosObject = [{
  id: 20,
  name: 'Can I pause my service?',
  intro: 'This is the article',
  url: '/translated/translated',
  categories: [1, 2],
  tags: [{
    name: WP_TAGS.PRIVATE_MOBILE
  }],
  relatedArticles: [5],
  video: '/media/uploads/superCoolUrlMrTest',
  key: 'someKey'
}];

describe('Videos ', () => {
  xdescribe('When the Videos selector is used...', () => {
    test('It should return normalized values for the videos when one exists.', () => {
      expect(Videos.Videos.resultFunc({
        data: videosObject
      })).toEqual(normalizedVideosObject);
    });
    test('It should return an empty array when no video object exists.', () => {
      expect(Videos.Videos.resultFunc([])).toEqual([]);
    });
  });

  describe('When the VideosForSubscriberLevel selector is used...', () => {
    const subscriber = {
      isLoggedIn: true,
      hasMobileOffers: true,
      hasBroadbandOffers: true
    };
    test('It should return the videos that match the id for the topic when one exists.', () => {
      expect(Videos.VideosForSubscriberLevel.resultFunc(normalizedVideosObject, subscriber))
        .toEqual(normalizedVideosObject);
    });
    test('It should return an empty array when no video object exists that match the query.', () => {
      subscriber.hasMobileOffers = false;
      expect(Videos.VideosForSubscriberLevel.resultFunc(normalizedVideosObject, subscriber))
        .toEqual([]);
    });
  });

  describe('When the IsVideosLoading selector is used...', () => {
    test('It should return true when the state has isLoading set to true.', () => {
      expect(Videos.IsVideosLoading.resultFunc({
        isLoading: true
      })).toEqual(true);
    });
    test('It should return false when the state has isLoading set to false.', () => {
      expect(Videos.IsVideosLoading.resultFunc({
        isLoading: false
      })).toEqual(false);
    });
  });
});
