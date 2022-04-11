import axios from 'axios';
import AppConfig from 'AppConfig';
import { AWS_OBJECTS } from '../../../constants/aws.constants';
import { CreateAsyncFromString } from 'selfcare-core/src/redux/utils/action.creator';
import { cdnThunkHelper } from 'selfcare-core/src/redux/utils/thunk.helpers';
import { ApiFault } from '@selfcare/core/redux/fault/fault.actions.js';
import { translateFault, generateUnhandledFault } from '@selfcare/core/redux/utils/fault.helper';

export const CampaignTypes = {
  FetchCampaign: CreateAsyncFromString('FETCH_CAMPAIGNS')
};

export const RetrieveCampaigns = () => (dispatch) => {
  return cdnThunkHelper(dispatch, CampaignTypes.FetchCampaign, {
    method: 'GET',
    url: AWS_OBJECTS.CAMPAIGNS
  });
};

export const RetrieveCampaignsAsync = () => async (dispatch) => {
  const request = {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-store'
    },
    url: `${AppConfig.CDN_API_URL}/${AWS_OBJECTS.CAMPAIGNS}`
  };

  dispatch({
    type: CampaignTypes.FetchCampaign.BEGIN
  });

  await axios(request).then((result) => {
    dispatch({
      type: CampaignTypes.FetchCampaign.SUCCESS,
      payload: result.data
    });
  }).catch((error) => {
    const fault = {
      ...translateFault(generateUnhandledFault(error.response)),
      trigger: CampaignTypes.FetchCampaign.BEGIN
    };

    dispatch(ApiFault(fault, request));
  });
};
