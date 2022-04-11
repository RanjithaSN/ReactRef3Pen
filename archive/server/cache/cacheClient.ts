

type Callback = (err: Error, res: string[]) => void;

export interface CacheClient {
  get: (cacheKey: string) => Promise<string> | string | null;
  set: (cacheKey: string, value: string, what?: string, time?: number) => void;
  keys: (pattern: string, cb?: Callback) => void;
  del: (keys: string[]) => void;
  flush: () => void;
  scanStream: () => Buffer,
  pipeline: () => undefined,
}

const cache: {
  [key: string]: {
    expires: number;
    value: string;
  };
} = {};

export const createDummyClient = (): CacheClient => ({
  get: (cacheKey) => undefined,
  set: (cacheKey, value, what, time) => undefined,
  keys: (pattern, cb) => undefined,
  del: (keys) => undefined,
  flush: () => undefined,
  scanStream: () => undefined,
  pipeline: () => undefined,
});

export const createMemoryCacheClient = (): CacheClient => ({
  get: (cacheKey) => {
    const now = Date.now();
    if (cache[cacheKey] && cache[cacheKey].expires >= now) {
      return cache[cacheKey].value;
    }
    return undefined;
  },
  set: (cacheKey, value, what, time) => {
    cache[cacheKey] = {
      expires: Date.now() + time * 1000,
      value,
    };
  },
  keys: (pattern, cb) => {
    cb(null, Object.keys(cache).filter(key => key.search(pattern) > -1))
  },
  del: (keys) => {
    keys.forEach(key => delete cache[key]);
    return undefined;
  },
  flush: () => {
    Object.keys(cache).forEach(key => delete cache[key]);
  },
  scanStream: () => undefined,
  pipeline: () => undefined,
});