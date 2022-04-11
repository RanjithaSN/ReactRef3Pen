import { dataLayerPush } from '@selfcare/core/analytics/analytics.helper';

// TODO Move this into using the analytics
export const useGoogleAnalytics = () => {
  return (analytic) => {
    // TODO Add logic to use console.log when running locally
    dataLayerPush(analytic);
  };
};
