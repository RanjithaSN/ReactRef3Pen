import { NextFunction, Request, Response } from 'express';

interface CacheClient {
  get: (key: string) => any | undefined;
  put: (key: string, value: any) => void;
  keys: () => string[];
  delete: (key: string) => void;
  flush: () => void;
}

const cache: {
  [key: string]: string;
} = {};

const cacheClientFactory = (): CacheClient => ({
  get: (key) => cache[key] ? cache[key] : undefined,
  put: (key, value) => {
    cache[key] = value;
  },
  keys: () => Object.keys(cache),
  delete: (key) => {
    delete cache[key];
  },
  flush: () => {
    Object.keys(cache).forEach((key) => delete cache[key]);
  }
});

export default () => (req: Request, _: Response, next: NextFunction) => {
  req.cacheClient = cacheClientFactory();
  next();
};
