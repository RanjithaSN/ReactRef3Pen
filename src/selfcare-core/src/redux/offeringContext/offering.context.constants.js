export const OfferingContextIntent = {
  ADD: 1,
  MODIFY: 2,
  TRANSITION: 3,
  REMOVE: 4,
  UNDO: 6
};

export const offeringLinesOfBusiness = {
  BROADBAND: 'Broadband',
  WIRELESS: 'Wireless',
  PLAY: 'Penny Play'
};

const ALLOWANCE_EXTERNAL_DISPLAY_NAME = 'Allowance';
const BROADBAND_EXTERNAL_DISPLAY_NAME = 'Broadband1';
const MOBILE_EXTERNAL_DISPLAY_NAME = 'TeleMobil';
const PLAY_EXTERNAL_DISPLAY_NAME = 'Penny_Play';
const BENIFY_EXTERNAL_DISPLAY_NAME = 'BenefyDeals_Mobil';
const STUDENT_MOBILE_DISPLAY_NAME = 'Student_Mobil';
const STUDENT_BROADBAND_DISPLAY_NAME = 'Student_BB1';
const CAMPAIGN_BROADBAND_EXTERNAL_DISPLAY_NAME = 'Mellandagsrea_BB';
const CAMPAIGN_MOBILE_EXTERNAL_DISPLAY_NAME = 'Mellandagsrea_Mobil';
const BLACK_FRIDAY_MOBILE_DISPLAY_NAME = 'BlackFridayCampaign_Mobil';
const BLACK_FRIDAY_BROADBAND_DISPLAY_NAME = 'BlackFridayCampaign_BB';

export const ProductOriginalNames = {
  BROADBAND: 'Bredband',
  MOBILE: 'Mobil'
};

export const ShopPlayExternalDisplayNames = {
  PLAY: PLAY_EXTERNAL_DISPLAY_NAME
};

export const ShopBenifyExternalDisplayNames = {
  BENIFY: BENIFY_EXTERNAL_DISPLAY_NAME
};

export const ShopExternalDisplayNames = {
  BROADBAND: BROADBAND_EXTERNAL_DISPLAY_NAME,
  MOBILE: MOBILE_EXTERNAL_DISPLAY_NAME,
  STUDENT_MOBILE: STUDENT_MOBILE_DISPLAY_NAME,
  STUDENT_BROADBAND: STUDENT_BROADBAND_DISPLAY_NAME,
  CAMPAIGN_BROADBAND: CAMPAIGN_BROADBAND_EXTERNAL_DISPLAY_NAME,
  CAMPAIGN_MOBILE: CAMPAIGN_MOBILE_EXTERNAL_DISPLAY_NAME
};

export const AllExternalDisplayNames = {
  ALLOWANCE: ALLOWANCE_EXTERNAL_DISPLAY_NAME,
  BROADBAND: BROADBAND_EXTERNAL_DISPLAY_NAME,
  MOBILE: MOBILE_EXTERNAL_DISPLAY_NAME,
  PLAY: PLAY_EXTERNAL_DISPLAY_NAME,
  BENIFY: BENIFY_EXTERNAL_DISPLAY_NAME,
  STUDENT_MOBILE: STUDENT_MOBILE_DISPLAY_NAME,
  STUDENT_BROADBAND: STUDENT_BROADBAND_DISPLAY_NAME,
  CAMPAIGN_BROADBAND: CAMPAIGN_BROADBAND_EXTERNAL_DISPLAY_NAME,
  CAMPAIGN_MOBILE: CAMPAIGN_MOBILE_EXTERNAL_DISPLAY_NAME,
  BLACK_FRIDAY_MOBILE: BLACK_FRIDAY_MOBILE_DISPLAY_NAME,
  BLACK_FRIDAY_BROADBAND: BLACK_FRIDAY_BROADBAND_DISPLAY_NAME
};

export const getBroadbandExternalOfferNames = (isCampaignType) => {
  const offerNames = [];

  if (!isCampaignType) {
    offerNames.push(AllExternalDisplayNames.BROADBAND, AllExternalDisplayNames.STUDENT_BROADBAND);
  } else {
    offerNames.push(AllExternalDisplayNames.CAMPAIGN_BROADBAND);
  }

  return offerNames;
};

export const getMobileExternalOfferNames = (isCampaignType) => {
  const offerNames = [];

  if (!isCampaignType) {
    offerNames.push(AllExternalDisplayNames.MOBILE, AllExternalDisplayNames.STUDENT_MOBILE);
  } else {
    offerNames.push(AllExternalDisplayNames.CAMPAIGN_MOBILE);
  }

  return offerNames;
};

export const getBundleExternalOfferNames = (isCampaignType) => {
  return getBroadbandExternalOfferNames(isCampaignType).concat(getMobileExternalOfferNames(isCampaignType));
};

/**
 * Predicates for different types of offers.
 * */
export const isBroadbandType = (offering) => {
  if (!offering) {
    return false;
  }
  return offering.type === ShopExternalDisplayNames.BROADBAND || offering.type === ShopExternalDisplayNames.STUDENT_BROADBAND || offering.type === ShopExternalDisplayNames.CAMPAIGN_BROADBAND;
};

export const isMobileType = (offering) => {
  if (!offering) {
    return false;
  }
  return offering.type === ShopExternalDisplayNames.MOBILE || offering.type === ShopExternalDisplayNames.STUDENT_MOBILE || offering.type === ShopExternalDisplayNames.CAMPAIGN_MOBILE;
};

export const isStudentType = (offering) => {
  if (!offering) {
    return false;
  }
  return offering.type === ShopExternalDisplayNames.STUDENT_BROADBAND || offering.type === ShopExternalDisplayNames.STUDENT_MOBILE;
};

export const isCampaignType = (offering) => {
  if (!offering) {
    return false;
  }
  return offering.type === ShopExternalDisplayNames.CAMPAIGN_BROADBAND || offering.type === ShopExternalDisplayNames.CAMPAIGN_MOBILE;
};

export const isBenifyType = (offering) => {
  if (!offering) {
    return false;
  }
  return offering.type === AllExternalDisplayNames.BENIFY;
};
