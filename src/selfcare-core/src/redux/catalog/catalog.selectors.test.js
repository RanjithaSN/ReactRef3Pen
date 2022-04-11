import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './catalog.reducer';
import * as CatalogSelectors from './catalog.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      catalog: INITIAL_STATE
    }
  }
});

describe('Catalog Selectors', () => {
  describe('When the CatalogSearchResults is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const catalogSearchResults = {
        Products: {
          1: {
            ThumbnailUrl: 'path/to/image1.png'
          },
          3: {
            ThumbnailUrl: 'path/to/image3.png'
          }

        },
        SearchResults: [{
          Id: '1',
          Name: 'SearchResult 1'
        }, {
          Id: '2',
          Name: 'SearchResult 2'
        }, {
          Id: '3',
          Name: 'SearchResult 3'
        }]
      };
      const EXPECTED = [{
        Id: 1,
        Name: 'SearchResult 1',
        ThumbnailUrl: 'path/to/image1.png'
      }, {
        Id: 2,
        Name: 'SearchResult 2',
        ThumbnailUrl: null
      }, {
        Id: 3,
        Name: 'SearchResult 3',
        ThumbnailUrl: 'path/to/image3.png'
      }];

      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'catalog', 'data'], catalogSearchResults);
      expect(CatalogSelectors.CatalogSearchResults(CUSTOM_STATE)).toEqual(EXPECTED);
    });

    test('It should return an empty array when there is no store passed in.', () => {
      expect(CatalogSelectors.CatalogSearchResults()).toEqual([]);
    });

    test('It should return null when there is no SearchResults attribute in the store.', () => {
      expect(CatalogSelectors.CatalogSearchResults.resultFunc({})).toEqual([]);
    });
  });
});
