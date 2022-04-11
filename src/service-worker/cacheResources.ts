declare let APP_VERSION: number;
import { getConfig, saveConfig } from './persist';
const CACHE_NAME = `penny-${APP_VERSION}`;

const blacklistUrls = [
  '.json$',
  'login',
  'service-worker.js',
  '__webpack_hmr',
  '/push/config',
  'health',
  'metrics'
];

const whitelistUrls = [
  'om/mobil$',
  'om/bredband$',
  'om/erbjudanden$',
  'om/play$',
  'om/penny$',
  '/hjälp$',
  '(.css|.js|.png|.svg|.jpe?g|.webp)$'
];

interface PushConfig {
  publicKey: string;
  stats: {
    publicPath: string;
    assets: {
      name: string;
    }[];
  };
}

export const cacheResources = async (): Promise<void> => {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch('/push/config');
  const { stats, publicKey }: PushConfig = await response.json();

  const currentConfig = await getConfig();
  currentConfig.publicKey = publicKey;
  await saveConfig(currentConfig);
  const files = [
    '/om/mobil',
    '/om/bredband',
    '/om/erbjudanden',
    '/om/play',
    '/om/penny',
    '/hjälp',
    ...stats.assets.map((asset) => stats.publicPath + asset.name)
  ];
  return cache.addAll(files);
};

export const clearOldCache = async (): Promise<boolean[]> => {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames.filter((name) => name !== CACHE_NAME).map((oldCacheName) => caches.delete(oldCacheName))
  );
};

const fetchRequest = async (request: Request): Promise<Response> => {
  const response = await fetch(request);
  try {
    if (!response || response.status !== 200 || response.type !== 'basic' || request.method !== 'GET') {
      return response;
    }
    if (!whitelistUrls.some((url) => request.url.match(new RegExp(url)))) {
      return response;
    }
    if (blacklistUrls.some((url) => request.url.match(new RegExp(url)))) {
      return response;
    }

    const responseToCache = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
    return response;
  } catch (e) {
    return response;
  }
};

export const getResponseByRequest = async (request: Request): Promise<Response> => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  if (!request.url.includes('/static') && request.url !== '/om/penny') {
    const fetchedResponse = await fetchRequest(request);
    if (cachedResponse && fetchedResponse.status >= 400) {
      return Promise.resolve(cachedResponse);
    }
    return Promise.resolve(fetchedResponse);
  }
  return cachedResponse ? Promise.resolve(cachedResponse) : fetchRequest(request);
};
