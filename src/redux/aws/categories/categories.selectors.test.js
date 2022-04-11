import * as Categories from './categories.selectors';

const categoriesObject = [
  {
    cat_ID: 20,
    name: 'Can I pause my service?',
    description: 'A brief summary',
    category_parent: 0,
    tag: 'public'
  }, {
    cat_ID: 21,
    name: 'Can I pause my service? v2',
    description: 'A brief summary v2',
    category_parent: 20,
    tag: 'public'
  }
];

const normalizedCategoriesObject = [
  {
    id: 20,
    name: 'Can I pause my service?',
    description: 'A brief summary',
    parent: 0,
    tag: 'public'
  }, {
    id: 21,
    name: 'Can I pause my service? v2',
    description: 'A brief summary v2',
    parent: 20,
    tag: 'public'
  }
];

describe('Categories', () => {
  describe('When the CategoriesAndTopics selector is used...', () => {
    test('It should return normalized values for the categories when one exists.', () => {
      expect(Categories.CategoriesAndTopics.resultFunc({
        data: categoriesObject
      })).toEqual(normalizedCategoriesObject);
    });
    test('It should return an empty array when no categories object exists.', () => {
      expect(Categories.CategoriesAndTopics.resultFunc([])).toEqual([]);
    });
  });

  describe('When the Categories selector is used...', () => {
    const subscriber = {
      isLoggedIn: true,
      hasMobileOffers: true,
      hasBroadbandOffers: true
    };
    test('It should return the categories that have no parent.', () => {
      expect(Categories.Categories.resultFunc(normalizedCategoriesObject, subscriber))
        .toEqual([normalizedCategoriesObject[0]]);
    });
    test('It should return an empty array when no category without a parent exists that match the query.', () => {
      expect(Categories.Categories.resultFunc([]))
        .toEqual([]);
    });
  });

  describe('When the Topics selector is used...', () => {
    const subscriber = {
      isLoggedIn: true,
      hasMobileOffers: true,
      hasBroadbandOffers: true
    };
    test('It should return the categories that have a parent.', () => {
      expect(Categories.Topics.resultFunc(normalizedCategoriesObject, 20, subscriber))
        .toEqual([normalizedCategoriesObject[1]]);
    });
    test('It should return an empty array when no category without a parent exists that match the query.', () => {
      expect(Categories.Topics.resultFunc([]))
        .toEqual([]);
    });
  });

  describe('When the IsCategoriesLoading selector is used...', () => {
    test('It should return true when the state has isLoading set to true.', () => {
      expect(Categories.IsCategoriesLoading.resultFunc({
        isLoading: true
      })).toEqual(true);
    });
    test('It should return false when the state has isLoading set to false.', () => {
      expect(Categories.IsCategoriesLoading.resultFunc({
        isLoading: false
      })).toEqual(false);
    });
  });
});
