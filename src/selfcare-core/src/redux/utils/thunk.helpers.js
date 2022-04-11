import * as ApiConstants from './api.constants';
import { generateUnhandledFault, translateFault } from './fault.helper';
import ApiFaultCodes from '../../constants/api.fault.codes';
import { ApiFault } from '../fault/fault.actions';
import { CurrentSession } from '../session/session.selectors';
import {
  CdnApiUrl,
  CloudSearchUrl,
  MetadataApiUrl,
  SelectedDistributionChannel,
  SelectedSystemId,
  ServiceApiUrl,
  StubApiUrl,
  Tele2ApiUrl,
  Tele2AuthApiUrl,
  MecenatApiUrl,
  InaccountHelpApiUrl
} from '../settings/settings.selectors';
import { Subscriber } from '../subscriber/subscriber.selectors';
import path from 'ramda/src/path';
import last from 'ramda/src/last';
import axios from 'axios';

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

const isROCCall = (tags) => {
  return tags.length && tags[0] === ApiConstants.ROC_CALL_STRING;
};

const getFaultMessage = (fault, overrideApis, apiName) => {
  return overrideApis.find((api) => api === fault.Code) > -1 ? `${apiName} failed ${fault.Subcode || fault.Code}` : fault.Message;
};

const thunkHelper = async (dispatch, { BEGIN, SUCCESS }, config, requestObject) => {
  if (typeof window === 'undefined') {
    return;
  }

  dispatch({
    type: BEGIN,
    requestObject
  });

  let result;
  const customData = {};
  const tags = [];

  if (requestObject) {
    customData.requestObject = requestObject;
  }

  if (config) {
    customData.config = config;
    const tagMatched = config.url.match(/.*\/(.*)/);

    tagMatched && tags.push(last(tagMatched));

    if (isROCCall(tags)) {
      rg4js(
        'recordBreadcrumb',
        {
          message: `${tags[0]} payload`,
          level: 'warning',
          metadata: {
            configData: config.data
          }
        }
      );
    }
  }

  try {
    result = await axios(config);
  } catch (err) {
    const fault = {
      ...translateFault(generateUnhandledFault(err.response)),
      trigger: BEGIN
    };

    dispatch(ApiFault(fault, requestObject));

    rg4js('send', {
      error: new Error(err),
      customData: customData,
      tags: tags
    });

    throw fault;
  }

  const { data } = result;

  if (data.errorMessage) {
    let errorMessage = null;
    try {
      errorMessage = JSON.parse(data.errorMessage);
    } catch {
      errorMessage = {
        ErrorType: {
          Code: data.errorMessage
        },
        Message: data.errorMessage
      };
    }

    rg4js(
      'recordBreadcrumb',
      {
        message: tags ? tags[0] : 'api-fault',
        level: 'error',
        metadata: {
          fault: errorMessage,
          payload: config.data
        }
      }
    );
    rg4js('send', {
      error: new Error(errorMessage.Message),
      customData: data,
      tags: tags
    });

    const error = {
      Code: errorMessage.ErrorType.Code,
      Status: null
    };

    const fault = {
      ...translateFault(error),
      login: true,
      trigger: BEGIN
    };

    dispatch(ApiFault(fault, requestObject));
    throw fault;
  }

  const checkIfKnownErrors = (data_Fault) => {
    if(data_Fault.Code === ApiFaultCodes.ADYEN_ADDITIONAL_AUTH_REQUIRED){
      return true;
    }

    if(data_Fault.Code === ApiFaultCodes.ADYEN_PAYMENT_FAULT && data_Fault.Subcode){
      return ApiFaultCodes.ADYEN_PAYMENT_FAULT_CODES_NOT_LOG.includes(data_Fault.Subcode);
    }
  };

  if (data.Fault) {
    customData.fault = data.Fault;
    const isPasswordFault = data.Fault.Code === ApiFaultCodes.PASSWORD_FAULT;
    const overrideApis = [ApiFaultCodes.ADYEN_PAYMENT_FAULT, ApiFaultCodes.ADYEN_ADDITIONAL_AUTH_REQUIRED];
    const isKnownFault = checkIfKnownErrors(data.Fault);
    const apiFaultMessage = getFaultMessage(data.Fault, overrideApis, (tags ? tags[0] : 'api-fault'));

    // breadcrumb to act as a marker of the fault in breadcrumbs tab
    rg4js(
      'recordBreadcrumb',
      {
        message: tags ? tags[0] : 'api-fault',
        level: 'error',
        metadata: {
          fault: data.Fault,
          payload: isPasswordFault ? {} : config.data
        }
      }
    );

    if (!isKnownFault) {
      rg4js('send', {
        error: new Error(apiFaultMessage),
        customData: isPasswordFault ? {} : customData,
        tags: tags
      });
    }

    if (data.Fault.Code === ApiFaultCodes.USER_HAS_NO_ADDRESS_FAULT) {
      dispatch({
        type: SUCCESS,
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
      trigger: BEGIN
    };

    dispatch(ApiFault(fault, requestObject));

    throw fault;
  }

  if (isROCCall(tags)) {
    rg4js(
      'recordBreadcrumb',
      {
        message: `${tags[0]} response`,
        level: 'warning',
        metadata: {
          data: data
        }
      }
    );
  }

  dispatch({
    type: SUCCESS,
    payload: data,
    requestObject
  });

  return data;
};

const getCombinedHeaders = (headers, removeCurrentSession, store) => {
  let combinedHeaders = {};

  if (!headers) {
    combinedHeaders = {
      [ApiConstants.SESSION_ID_HEADER]: removeCurrentSession ? null : CurrentSession(store),
      [ApiConstants.SYSTEM_ID_HEADER]: SelectedSystemId(store),
      [ApiConstants.LANGUAGE_HEADER]: ApiConstants.LOCALE,
      [ApiConstants.DISTRIBUTION_CHANNEL_ID_HEADER]: SelectedDistributionChannel(store)
    };
  } else {
    combinedHeaders = {
      ...headers,
      [ApiConstants.SESSION_ID_HEADER]: removeCurrentSession ? null : (headers[ApiConstants.SESSION_ID_HEADER] || CurrentSession(store)),
      [ApiConstants.SYSTEM_ID_HEADER]: headers[ApiConstants.SYSTEM_ID_HEADER] || SelectedSystemId(store),
      [ApiConstants.LANGUAGE_HEADER]: headers[ApiConstants.LANGUAGE_HEADER] || ApiConstants.LOCALE,
      [ApiConstants.DISTRIBUTION_CHANNEL_ID_HEADER]: headers[ApiConstants.DISTRIBUTION_CHANNEL_ID_HEADER] || SelectedDistributionChannel(store)
    };
  }

  return combinedHeaders;
};

export const apiThunkHelper = (dispatch, store, types, config, requestObject) => {
  const { headers, removeCurrentSession, url, ...smallConfig } = config;

  const combinedHeaders = getCombinedHeaders(headers, removeCurrentSession, store);

  const apiConfig = {
    headers: combinedHeaders,
    method: 'post',
    data: requestObject,
    url: `${ServiceApiUrl(store)}/${url}`,
    ...smallConfig
  };

  return thunkHelper(dispatch, types, apiConfig, requestObject);
};

export const cdnThunkHelper = (dispatch, types, config, requestObject) => {
  const apiConfig = {
    method: 'get',
    data: requestObject,
    url: `${CdnApiUrl}/${config.url}`,
    headers: {
      'Cache-Control': 'no-store'
    }
  };

  return thunkHelper(dispatch, types, apiConfig, requestObject);
};

export const metadataThunkHelper = (dispatch, store, types, config, requestObject) => {
  const languageHeader = ApiConstants.LOCALE;
  const systemId = SelectedSystemId(store);
  const metadataApiUrl = MetadataApiUrl(store);
  const distributionChannel = SelectedDistributionChannel(store);

  const apiConfig = {
    method: 'get',
    data: requestObject,
    url: `${metadataApiUrl}/${config.url}${ApiConstants.LANGUAGE_URL_PARAM}/${languageHeader}${ApiConstants.SYSTEM_ID_URL_PARAM}/${systemId}/${ApiConstants.JSON_LONG_AS_STRING_PARAM}/${ApiConstants.DISTRIBUTION_CHANNEL_HEADER}/${distributionChannel}`
  };

  return thunkHelper(dispatch, types, apiConfig, requestObject);
};

export const productMetadataThunkHelper = (dispatch, store, types, config, requestObject) => {
  const systemId = SelectedSystemId(store);
  const metadataApiUrl = MetadataApiUrl(store);

  const apiConfig = {
    method: 'get',
    data: requestObject,
    url: `${metadataApiUrl}${ApiConstants.PRODUCT_URL_PARAM}${ApiConstants.SYSTEM_ID_URL_PARAM}/${systemId}/${config.url}`
  };

  return thunkHelper(dispatch, types, apiConfig, requestObject);
};

export const stubThunkHelper = (dispatch, store, types, config, requestObject) => {
  const { headers, url } = config;
  const stubApiUrl = StubApiUrl(store);
  const combinedHeaders = {
    ...headers,
    [ApiConstants.SESSION_ID_HEADER]: CurrentSession(store),
    [ApiConstants.SYSTEM_ID_HEADER]: SelectedSystemId(store),
    [ApiConstants.LANGUAGE_HEADER]: ApiConstants.LOCALE
  };

  const apiConfig = {
    headers: combinedHeaders,
    method: 'post',
    data: requestObject,
    url: `${stubApiUrl}/${url}`
  };

  return thunkHelper(dispatch, types, apiConfig, requestObject);
};

export const mecenatThunkHelper = (dispatch, store, types, config) => {
  const mecenatUrl = MecenatApiUrl(store);
  const { method, url, data } = config;
  const apiConfig = {
    method,
    data,
    url: `${mecenatUrl}${url}`
  };

  return thunkHelper(dispatch, types, apiConfig);
};

export const tele2ThunkHelper = (dispatch, store, types, config, requestObject, subscriberId) => {
  const { auth, contentType, method, url } = config;
  const subscriber = Subscriber(store);

  let headers = {};
  if (auth) {
    headers = {
      Authorization: `Bearer ${CurrentSession(store)}`,
      'CD-SubscriberId': subscriberId || path(['Id'], subscriber),
      'Content-Type': contentType || 'application/json;charset=UTF-8',
      [ApiConstants.SYSTEM_ID_HEADER]: SelectedSystemId(store)
    };
  }

  const apiConfig = {
    headers,
    method,
    data: JSON.stringify(requestObject),
    url: `${auth ? Tele2AuthApiUrl(store) : Tele2ApiUrl(store)}/${url}`
  };

  if (!auth || (auth && (subscriberId || path(['Id'], subscriber)))) {
    return thunkHelper(dispatch, types, apiConfig, requestObject);
  }
};

export const KTThunkHelper = async (dispatch, { BEGIN, SUCCESS }, config, requestObject) => {
  const { url } = config;

  dispatch({
    type: BEGIN,
    requestObject
  });

  let result;

  try {
    result = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    }).then((res) => {
      return res.json();
    });
  } catch (err) {
    throw new Error(err);
  }

  const data = result;

  if (data.message) {
    throw data.message;
  }

  dispatch({
    type: SUCCESS,
    payload: data,
    requestObject
  });

  return data;
};

export const cloudSearchThunkHelper = (dispatch, types, config, requestObject) => {
  const cloudSearchUrl = CloudSearchUrl();
  const apiConfig = {
    method: 'get',
    data: requestObject,
    url: `${cloudSearchUrl}${config.queryParam}`
  };

  return thunkHelper(dispatch, types, apiConfig);
};

export const inaccountHelpThunkHelper = (dispatch, store, types, config) => {
  const inaccountHelpUrl = InaccountHelpApiUrl(store);

  const { method, url } = config;
  const apiConfig = {
    method,
    url: `${inaccountHelpUrl}${url}`
  };

  return thunkHelper(dispatch, types, apiConfig);
};
