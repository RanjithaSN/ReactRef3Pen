import ApiFaultCodes from '@selfcare/core/constants/api.fault.codes';
import { ApiFault } from '@selfcare/core/redux/fault/fault.actions';
import * as ApiConstants from '@selfcare/core/redux/utils/api.constants';
import { generateUnhandledFault, translateFault } from '@selfcare/core/redux/utils/fault.helper';
import axios from 'axios';
import { call, fork, put, select, take } from 'redux-saga/effects';
import { CacheRequestAction, SelectorFactories } from '../cdnRequestCache/cdn.request.cache.helpers';
import { CurrentSession } from '../session/session.selectors';
import {
  MetadataApiUrl,
  SelectedDistributionChannel,
  SelectedSystemId,
  ServiceApiUrl
} from '../settings/settings.selectors';

axios.defaults.headers.post[ApiConstants.DISTRIBUTION_CHANNEL_ID_HEADER] = ApiConstants.DISTRIBUTION_CHANNEL_ID;
axios.defaults.headers.post[ApiConstants.JSON_LONG_AS_STRING_HEADER] = true;

axios.interceptors.request.use((conf) => {
  const config = {
    ...conf
  };
  Object.keys(config.headers).forEach((header) => {
    if (config.headers[header] === null) {
      delete config.headers[header];
      delete config.headers.post[header];
    }
  });
  return config;
});

export function* sagaHelper(action, force = false) {
  const isRequestCached = SelectorFactories.IsRequestCached(action);
  const isCached = yield select(isRequestCached);
  if (!force && isCached) {
    return;
  }

  const { types, requestObject, apiConfig } = action;

  yield put({
    type: types.BEGIN,
    requestObject
  });

  let result;

  try {
    result = yield call(axios, apiConfig);
    yield put(CacheRequestAction(action));
  } catch (err) {
    yield put(CacheRequestAction(action));
    const fault = {
      ...translateFault(generateUnhandledFault(err.response)),
      trigger: types.BEGIN
    };

    yield put(ApiFault(fault, requestObject));
    return;
  }

  const { data } = result;

  if (data.Fault) {
    if (data.Fault.Code === ApiFaultCodes.USER_HAS_NO_ADDRESS_FAULT) {
      yield put({
        type: types.SUCCESS,
        payload: {},
        requestObject
      });

      return;
    }

    if (data.Fault.Code === ApiFaultCodes.ADYEN_ADDITIONAL_AUTH_REQUIRED) {
      return data;
    }

    const fault = {
      ...translateFault(data.errorCode ? data : data.Fault),
      trigger: types.BEGIN
    };

    yield put(ApiFault(fault, requestObject));
    return;
  }

  yield put({
    type: types.SUCCESS,
    payload: data,
    requestObject
  });
}

export function* metadataSagaHelper(types, config, requestObject, force = false) {
  const languageHeader = ApiConstants.LOCALE;
  const systemId = yield select(SelectedSystemId);
  const metadataApiUrl = yield select(MetadataApiUrl);

  const apiConfig = {
    method: 'get',
    data: requestObject,
    url: `${metadataApiUrl}/${config.url}${ApiConstants.LANGUAGE_URL_PARAM}/${languageHeader}${ApiConstants.SYSTEM_ID_URL_PARAM}/${systemId}/${ApiConstants.JSON_LONG_AS_STRING_PARAM}`
  };

  const action = {
    type: 'FETCH_CDN_ASYNC',
    types,
    apiConfig,
    requestObject
  };
  yield call(sagaHelper, action, force);
}

export function* apiSagaHelper(types, config, requestObject, force) {
  const { headers, removeCurrentSession, url, ...smallConfig } = config;
  const sessionIdFromStore = yield select(CurrentSession);
  const systemIdFromStore = yield select(SelectedSystemId);
  const distChannelIdFromStore = yield select(SelectedDistributionChannel);

  const combinedHeaders = {
    ...headers,
    [ApiConstants.SESSION_ID_HEADER]: removeCurrentSession ? null : sessionIdFromStore,
    [ApiConstants.SYSTEM_ID_HEADER]: systemIdFromStore,
    [ApiConstants.LANGUAGE_HEADER]: ApiConstants.LOCALE,
    [ApiConstants.DISTRIBUTION_CHANNEL_ID_HEADER]: distChannelIdFromStore
  };

  const apiConfig = {
    headers: combinedHeaders,
    method: 'post',
    data: requestObject,
    url: `${yield select(ServiceApiUrl)}/${url}`,
    ...smallConfig
  };

  const action = {
    type: 'FETCH_CDN_ASYNC',
    types,
    apiConfig,
    requestObject
  };

  yield call(sagaHelper, action, force);
}

export function* sagaHelperWatcher() {
  while (true) {
    const action = yield take('FETCH_CDN_ASYNC');
    yield fork(sagaHelper, action);
  }
}
