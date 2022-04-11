import { CampaignTypes } from './campaigns.actions';
import { FaultTypes } from 'selfcare-core/src/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = new Immutable({
  campaigns: null,
  isLoading: false,
  isLoaded: false
});

export default function CampaignsReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case CampaignTypes.FetchCampaign.BEGIN:
    return state
      .set('isLoading', true)
      .set('isLoaded', false);
  case CampaignTypes.FetchCampaign.SUCCESS:
    return state.set('campaigns', payload)
      .set('isLoading', false)
      .set('isLoaded', true);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case CampaignTypes.FetchCampaign.BEGIN:
      return state.set('campaigns', null)
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
