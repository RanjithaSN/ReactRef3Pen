const io = require('./translate.io');

describe('Translate.io', () => {
  test('setInPath', () => {
    const path = 'codes.100';
    const value = 'test';
    const obj = {};
    io.setInPath(path, value, obj);
    expect(obj).toEqual({
      codes: {
        100: 'test'
      }
    });
  });

  test('notInObject postive', () => {
    const path = 'codes.100';
    const obj = {
      codes: {
        100: 'test'
      }
    };
    expect(io.notInObject(obj, path)).toEqual(false);
  });

  test('notInObject negative', () => {
    const path = 'codes.100';
    const obj = {
      codes: {}
    };
    expect(io.notInObject(obj, path)).toEqual(true);
  });

  test('sort object', () => {
    const obj = {
      b: {},
      a: {
        z: ['b', 'a'],
        y: 'test'
      }
    };
    expect(JSON.stringify(io.sortObject(obj))).toBe('{"a":{"y":"test","z":["b","a"]},"b":{}}');
  });

  test('getDestinationPath', () => {
    expect(io.getDestinationPath('path/en-us.json', 'fr-CA')).toBe('path/fr-ca.json');
  });
});
