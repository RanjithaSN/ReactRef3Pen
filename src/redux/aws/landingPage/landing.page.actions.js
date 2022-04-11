import axios from 'axios';
import AppConfig from 'AppConfig';
import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cdnSagaHelperAction } from '@selfcare/core/redux/utils/cdn.actions';
import { AWS_OBJECTS } from '../../../constants/aws.constants';
import { ApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { translateFault, generateUnhandledFault } from '@selfcare/core/redux/utils/fault.helper';

export const LandingPageTypes = {
  FetchLandingPage: CreateAsyncFromString('FETCH_LANDING_PAGE')
};

export const RetrieveLandingPage = () => {
  return cdnSagaHelperAction(LandingPageTypes.FetchLandingPage, {
    method: 'GET',
    url: AWS_OBJECTS.LANDING_PAGE
  });
};

export const RetrieveLandingPageAsync = () => (dispatch) => {
  const request = {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-store'
    },
    url: `${AppConfig.CDN_API_URL}/${AWS_OBJECTS.LANDING_PAGE}`
  };

  dispatch({
    type: LandingPageTypes.FetchLandingPage.BEGIN
  });

  return axios(request).then((result) => {
    dispatch({
      type: LandingPageTypes.FetchLandingPage.SUCCESS,
      payload: result.data
    });
  }).catch((error) => {
    const fault = {
      ...translateFault(generateUnhandledFault(error.response)),
      trigger: LandingPageTypes.FetchLandingPage.BEGIN
    };

    dispatch(ApiFault(fault, request));
  });
};
