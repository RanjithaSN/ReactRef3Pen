/* eslint no-underscore-dangle: off, @typescript-eslint/no-empty-function:off, import/namespace:off, no-import-assign:off */
import * as SessionStorageHelpers from './session.storage';
import * as logModule from '../log';

const mockFunction = jest.fn(() => { });
logModule.log = mockFunction;

beforeEach(() => {
  sessionStorage.setItem('testKey', JSON.stringify({
    id: 1
  }));
  mockFunction.mockReset();
});

afterEach(() => {
  sessionStorage.clear();
  mockFunction.mockRestore();
});

describe('Session storage helper tests', () => {
  test('it should read existing data in session storage with provided key', () => {
    const existingItem = SessionStorageHelpers.read('testKey');
    expect(existingItem).toBeDefined();
    expect(existingItem.id).toEqual(1);
  });

  test('it should return null when reading session storage with unknown key', () => {
    const existingItem = SessionStorageHelpers.read('bogusKey');
    expect(existingItem).toBeNull();
  });

  test('it should write new data with provided key', () => {
    SessionStorageHelpers.write('testKey', {
      id: 2,
      name: 'foo'
    });
    const newItem = SessionStorageHelpers.read('testKey');
    expect(newItem).toBeDefined();
    expect(newItem.id).toEqual(2);
    expect(newItem.name).toEqual('foo');
  });

  test('it should remove data with provided key', () => {
    SessionStorageHelpers.remove('testKey');
    const existingItem = SessionStorageHelpers.read('testKey');
    expect(existingItem).toBeNull();
  });
});


xdescribe('No session storage test', () => {
  const storage = global._sessionStorage;

  beforeEach(() => {
    global.sessionStorage = null;
    global._sessionStorage = null;
  });

  test('it should not be able to read', () => {
    const existingItem = SessionStorageHelpers.read('testKey');
    expect(existingItem).toBeUndefined();
    expect(mockFunction).toHaveBeenCalled();
  });

  test('it should not be able to write', () => {
    SessionStorageHelpers.write('key', {
      a: 'b'
    });
    expect(mockFunction).toHaveBeenCalled();
  });

  test('it should not be able to remove', () => {
    SessionStorageHelpers.remove('key');
    expect(mockFunction).toHaveBeenCalled();
  });

  afterEach(() => {
    global.sessionStorage = storage;
    global._sessionStorage = storage;
  });
});
