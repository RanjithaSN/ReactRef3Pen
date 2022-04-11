/* eslint no-underscore-dangle: off, @typescript-eslint/no-empty-function:off, import/namespace:off, no-import-assign:off */
import * as LocalStorageHelpers from './local.storage';
import * as logModule from '../log';

const mockFunction = jest.fn(() => { });
logModule.log = mockFunction;

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('testKey', JSON.stringify({
    id: 1
  }));
  mockFunction.mockReset();
});

afterEach(() => {
  localStorage.clear();
  mockFunction.mockRestore();
});

describe('Local storage helper tests', () => {
  test('it should read existing data in local storage with provided key', () => {
    const existingItem = LocalStorageHelpers.read('testKey');
    expect(existingItem).toBeDefined();
    expect(existingItem.id).toEqual(1);
  });

  test('it should return null when reading local storage with unknown key', () => {
    const existingItem = LocalStorageHelpers.read('bogusKey');
    expect(existingItem).toBeNull();
  });

  test('it should write new data with provided key', () => {
    LocalStorageHelpers.write('testKey', {
      id: 2,
      name: 'foo'
    });
    const newItem = LocalStorageHelpers.read('testKey');
    expect(newItem).toBeDefined();
    expect(newItem.id).toEqual(2);
    expect(newItem.name).toEqual('foo');
  });

  test('it should remove data with provided key', () => {
    LocalStorageHelpers.remove('testKey');
    const existingItem = LocalStorageHelpers.read('testKey');
    expect(existingItem).toBeNull();
  });
});

xdescribe('No local storage test', () => {
  const storage = global._localStorage;

  beforeEach(() => {
    global.localStorage = null;
    global._localStorage = null;
  });

  test('it should not be able to read', () => {
    const existingItem = LocalStorageHelpers.read('testKey');
    expect(existingItem).toBeUndefined();
    expect(mockFunction).toHaveBeenCalled();
  });

  test('it should not be able to write', () => {
    LocalStorageHelpers.write('key', {
      a: 'b'
    });
    expect(mockFunction).toHaveBeenCalled();
  });

  test('it should not be able to remove', () => {
    LocalStorageHelpers.remove('key');
    expect(mockFunction).toHaveBeenCalled();
  });

  afterEach(() => {
    global.localStorage = storage;
    global._localStorage = storage;
  });
});
