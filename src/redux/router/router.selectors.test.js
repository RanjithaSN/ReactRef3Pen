import { Location } from './router.selectors';

describe('Router ', () => {
  describe('When the Location is used...', () => {
    test('It should return the value of the location prop when one exists.', () => {
      expect(Location({}, {
        location: '/some/path'
      })).toEqual('/some/path');
    });

    test('It should return the value of currentLocation prop when there is no location prop.', () => {
      expect(Location({}, {
        currentLocation: '/current/location/prop'
      })).toEqual('/current/location/prop');
    });

    test('It should throw if neither location or currentLocation props exists', () => {
      expect(() => Location({}, {})).toThrow();
    });
  });
});
