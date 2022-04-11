import { Client } from '../../client.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['campaigns'], client);
});

export const ActiveCampaign = createSelector([
  Base
], (campaignsArticle) => {
  const campaigns = pathOr([], ['campaigns'], campaignsArticle);
  return Array.isArray(campaigns) ? campaigns.find((campaign) => campaign.custom_fields.campaign_enabled) : false;
});

export const IsCampaignLoading = createSelector([
  Base
], (campaign) => {
  return campaign.isLoading;
});

export const IsCampaignLoaded = createSelector([
  Base
], (campaign) => {
  return campaign.isLoaded;
});
