import { AllExternalDisplayNames } from '../../selfcare-core/src/redux/offeringContext/offering.context.constants';
import { Play1YTrial, Play1YTrialInactive, DoubleData, PENNY_PLAY_INACTIVE_DISPLAYNAME } from './constants';
import { Any, idsToProducts } from './conditions';
import { DiscountCondition } from './types';

export const discountConditionTable: DiscountCondition[] = [
  {
    appliesToProducts: [AllExternalDisplayNames.PLAY],
    discountType: Play1YTrial,
    condition: Any(idsToProducts([
      AllExternalDisplayNames.BROADBAND,
      AllExternalDisplayNames.MOBILE,
      AllExternalDisplayNames.STUDENT_MOBILE,
      AllExternalDisplayNames.STUDENT_BROADBAND,
      AllExternalDisplayNames.CAMPAIGN_BROADBAND,
      AllExternalDisplayNames.CAMPAIGN_MOBILE,
      AllExternalDisplayNames.BENIFY
    ]))
  },
  {
    appliesToProducts: [PENNY_PLAY_INACTIVE_DISPLAYNAME],
    discountType: Play1YTrialInactive,
    condition: Any(idsToProducts([
      AllExternalDisplayNames.BROADBAND,
      AllExternalDisplayNames.MOBILE,
      AllExternalDisplayNames.STUDENT_MOBILE,
      AllExternalDisplayNames.STUDENT_BROADBAND,
      AllExternalDisplayNames.CAMPAIGN_BROADBAND,
      AllExternalDisplayNames.CAMPAIGN_MOBILE,
      AllExternalDisplayNames.BENIFY
    ]))
  },
  {
    appliesToProducts: [AllExternalDisplayNames.MOBILE, AllExternalDisplayNames.STUDENT_MOBILE, AllExternalDisplayNames.CAMPAIGN_MOBILE],
    discountType: DoubleData,
    condition: Any(idsToProducts([
      AllExternalDisplayNames.BROADBAND,
      AllExternalDisplayNames.STUDENT_BROADBAND,
      AllExternalDisplayNames.CAMPAIGN_BROADBAND
    ]))
  }
];
