import { removeEmptyStrings } from './api.helper';

describe('API Helper', () => {
  describe('When removeEmptyStrings is used...', () => {
    it('should remove empty strings from the request', () => {
      expect(removeEmptyStrings({
        test: ''
      })).toEqual({});
    });
    it('should remove nested empty strings from the request', () => {
      expect(removeEmptyStrings({
        test: {
          test: ''
        }
      })).toEqual({
        test: {}
      });
    });
    it('should iterate over the array and remove empty strings from objects', () => {
      expect(removeEmptyStrings([{
        test: ''
      }])).toEqual([{}]);
    });
    it('should iterate over properties that are arrays', () => {
      expect(removeEmptyStrings({
        test: [{
          test: ''
        }]
      })).toEqual({
        test: [{}]
      });
    });
  });
});
