import * as Faq from './faq.selectors';

const faqObject = [
  {
    ID: 20,
    post_title: 'Can I pause my service?',
    guid: 'https://csg-penny-dev.aviture-sandbox.com/?post_type=faqs&#038;p=20',
    post_type: 'faqs',
    post_uri: '/20',
    post_categories: [{
      slug: 'one'
    }, {
      slug: 'two'
    }],
    custom_fields: {
      answer: 'Yes you can, go to the product you want to suspend and there should be an available option to suspend it.',
      related_article: false
    }
  }
];

const normalizedFaqObject = [
  {
    id: 20,
    title: 'Can I pause my service?',
    answer: 'Yes you can, go to the product you want to suspend and there should be an available option to suspend it.',
    uri: '/20',
    relatedArticle: null,
    categories: ['one', 'two']
  }
];

describe('Faq ', () => {
  describe('When the GetFaqs selector is used...', () => {
    test('It should return normalized values for the faqs attributes when one exists.', () => {
      expect(Faq.GetFaqs.resultFunc({
        data: faqObject
      })).toEqual(normalizedFaqObject);
    });
    test('It should return an empty array when no faq object exists.', () => {
      expect(Faq.GetFaqs.resultFunc([])).toEqual([]);
    });
  });

  describe('When the IsFaqsLoading selector is used...', () => {
    test('It should return true when the state has isLoading set to true.', () => {
      expect(Faq.IsFaqsLoading.resultFunc({
        isLoading: true
      })).toEqual(true);
    });
    test('It should return false when the state has isLoading set to false.', () => {
      expect(Faq.IsFaqsLoading.resultFunc({
        isLoading: false
      })).toEqual(false);
    });
  });
});
