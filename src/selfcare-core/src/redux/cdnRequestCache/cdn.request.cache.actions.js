export const CdnRequestCacheActionTypes = {
  UpsertSuccessfulRequest: 'CDN_REQUEST_CACHE.ADD_SUCCESSFUL_REQUEST'
};

export const UpsertSuccessfulRequestAction = (requestId, timestamp) => {
  return {
    type: CdnRequestCacheActionTypes.UpsertSuccessfulRequest,
    requestId,
    timestamp
  };
};
