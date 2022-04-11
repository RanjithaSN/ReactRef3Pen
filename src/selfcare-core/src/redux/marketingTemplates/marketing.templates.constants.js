export const MARKETING_TEMPLATES = {
  BUNDLED: 'Bundle Offers Standard Template',
  GENERIC: 'Generic',
  FEATURED: 'Featured Offers',
  LIST_VIEW: 'List View',
  DEVICE: 'Device Offer Template',
  PRODUCT_SELECTION: 'Penny Selfcare',
  REVIEW: 'Review Template',
  SIMPLE_OFFER: 'Simple Offer Template'
};

export const MARKETING_TEMPLATES_GROUPINGS = {
  DEVICE: [
    MARKETING_TEMPLATES.GENERIC,
    MARKETING_TEMPLATES.FEATURED,
    MARKETING_TEMPLATES.DEVICE,
    MARKETING_TEMPLATES.REVIEW
  ],
  SEARCH_OFFERS_LIST: [
    MARKETING_TEMPLATES.PRODUCT_SELECTION,

    // Marketing templates used for the baseline app. Keeping these here to showcase integration.
    // Unless they are created in a table it won't effect it
    MARKETING_TEMPLATES.BUNDLED,
    MARKETING_TEMPLATES.GENERIC,
    MARKETING_TEMPLATES.LIST_VIEW,
    MARKETING_TEMPLATES.SIMPLE_OFFER,
    MARKETING_TEMPLATES.DEVICE
  ]
};
