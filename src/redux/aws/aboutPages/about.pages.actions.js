import axios from 'axios';
import AppConfig from 'AppConfig';
import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cdnSagaHelperAction } from '@selfcare/core/redux/utils/cdn.actions';
import { AWS_OBJECTS } from '../../../constants/aws.constants';
import { ApiFault } from '@selfcare/core/redux/fault/fault.actions.js';
import { translateFault, generateUnhandledFault } from '@selfcare/core/redux/utils/fault.helper';

export const AboutPagesTypes = {
  RetrieveAboutPages: CreateAsyncFromString('RETRIEVE_ABOUT_PAGES')
};

export const RetrieveAboutPages = () => {
  return cdnSagaHelperAction(AboutPagesTypes.RetrieveAboutPages, {
    method: 'GET',
    url: AWS_OBJECTS.ABOUT_PAGES
  });
};

export const RetrieveAboutPagesAsync = () => (dispatch) => {
  const request = {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-store'
    },
    url: `${AppConfig.CDN_API_URL}/${AWS_OBJECTS.ABOUT_PAGES}`
  };

  dispatch({
    type: AboutPagesTypes.RetrieveAboutPages.BEGIN
  });

  return axios(request).then((result) => {
    dispatch({
      type: AboutPagesTypes.RetrieveAboutPages.SUCCESS,
      payload: result.data
    });
  }).catch((error) => {
    const fault = {
      ...translateFault(generateUnhandledFault(error.response)),
      trigger: AboutPagesTypes.RetrieveAboutPages.BEGIN
    };

    dispatch(ApiFault(fault, request));
  });
};
