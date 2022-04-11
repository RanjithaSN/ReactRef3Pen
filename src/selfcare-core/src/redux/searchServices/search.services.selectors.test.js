import * as selectors from './search.services.selectors';

describe('SearchServices ', () => {
  describe('SearchServicesData', () => {
    test('It should return an empty list if undefined.', () => {
      expect(selectors.SearchServicesData.resultFunc(undefined)).toEqual({});
    });

    test('It should return the list of transactions when populated.', () => {
      const payload = [{
        data: '1234'
      }];
      const services = {
        myphonenumber: payload
      };
      expect(selectors.SearchServicesData.resultFunc({
        data: services
      })).toEqual(services);
    });
  });
});
