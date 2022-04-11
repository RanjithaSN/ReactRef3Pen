import hash from 'object-hash';
import { createSelector } from 'reselect';
import { RequestCache } from './cdn.request.cache.selectors';
import { UpsertSuccessfulRequestAction } from './cdn.request.cache.actions';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const SelectorFactories = {
  IsRequestCached: (requestObject) => {
    const requestId = hash(requestObject);
    return createSelector([
      RequestCache
    ], (cache) => {
      const lastTimestamp = cache.getIn([requestId]);
      if (lastTimestamp === undefined) {
        return false;
      }
      const currentTime = Date.now();
      const timediff = currentTime - lastTimestamp;
      return timediff < CACHE_TTL;
    });
  }
};

export const CacheRequestAction = (requestObject) => UpsertSuccessfulRequestAction(hash(requestObject), Date.now());
