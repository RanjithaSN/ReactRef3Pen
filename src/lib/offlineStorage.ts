import { openDB } from 'idb';
declare let APP_VERSION: number;

const DB_NAME = 'penny';

const dbPromise = openDB(DB_NAME, APP_VERSION, {
  upgrade: (database, oldVersion) => {
    if (oldVersion < 1) {
      database.createObjectStore('keyval');
    }
  }
});

const storage = {
  get: async (key: string): Promise<any> => (await dbPromise).get('keyval', key),
  set: async (key: string, val: any): Promise<IDBValidKey> => (await dbPromise).put('keyval', val, key),
  delete: async (key: string): Promise<void> => (await dbPromise).delete('keyval', key),
  clear: async (): Promise<void> => (await dbPromise).clear('keyval'),
  keys: async (): Promise<IDBValidKey[]> => (await dbPromise).getAllKeys('keyval')
};

export default storage;
