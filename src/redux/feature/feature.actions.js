export const FeatureActionTypes = {
  EnableFeature: 'FEATURE_ENABLE',
  DisableFeature: 'FEATURE_DISABLE',
  EnableVariant: 'FEATURE_VARIANT_ENABLE'
};

export const enableFeature = (feature) => ({
  type: FeatureActionTypes.EnableFeature,
  feature
});
export const disableFeature = (feature) => ({
  type: FeatureActionTypes.DisableFeature,
  feature
});

export const enableVariant = (feature, variant) => ({
  type: FeatureActionTypes.EnableVariant,
  feature,
  variant
});
