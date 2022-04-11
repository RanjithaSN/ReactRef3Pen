import {
  CdnApiUrl
} from '../settings/settings.selectors';

const sagaHelperAction = (types, apiConfig, requestObject) => {
  const action = {
    type: 'FETCH_CDN_ASYNC',
    types,
    apiConfig,
    requestObject
  };
  return action;
};

// equivalent of cdnThunkHelper
export const cdnSagaHelperAction = (types, config, requestObject) => {
  const apiConfig = {
    method: 'get',
    data: requestObject,
    url: `${CdnApiUrl}/${config.url}`,
    headers: {
      'Cache-Control': 'no-store'
    }
  };

  return sagaHelperAction(types, apiConfig, requestObject);
};
