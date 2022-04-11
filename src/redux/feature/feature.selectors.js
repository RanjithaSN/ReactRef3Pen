import { createSelector } from 'reselect';

export const isFeatureEnabled = createSelector(
  (state) => state.features,
  (state, feature) => feature,
  (features, feature) => !!features[feature]
);

export const getFeatureVariant = createSelector(
  (state) => state.features,
  (state, feature) => feature,
  (features, feature) => features[feature]
);
