import { ArticlesForSubscriberLevel } from './topics.selectors';

const generalArticles = [{
  id: 20,
  name: 'Can I pause my service?',
  content: 'This is the article',
  description: 'A brief summary',
  categories: [1, 2],
  relatedArticles: [5]
}, {
  id: 21,
  name: 'What is up with my service?',
  content: 'This is the article',
  description: 'A brief summary',
  categories: [1, 2],
  relatedArticles: [5]
}];

const guides = [{
  id: 22,
  name: 'Do I have to pause my service?',
  content: 'This is the article',
  description: 'A brief summary',
  categories: [1, 2],
  relatedArticles: [5]
}];

const videos = [{
  id: 299,
  name: 'Could I pause my service?',
  content: 'This is the article',
  description: 'A brief summary',
  categories: [1, 2],
  relatedArticles: [5]
}];

describe('Topics Selectors ', () => {
  describe('When the ArticlesForSubscriberLevel selector is used...', () => {
    test('It should return a merged array of article types, sorted by name.', () => {
      const result = ArticlesForSubscriberLevel.resultFunc(generalArticles, guides, videos);
      expect(result).toEqual([generalArticles[0], videos[0], guides[0], generalArticles[1]]);
    });
  });
});
