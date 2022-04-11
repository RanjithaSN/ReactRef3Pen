import groupBy from 'ramda/src/groupBy';
import isEmpty from 'ramda/src/isEmpty';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import prop from 'ramda/src/prop';
import { OFFERING_OVERALL_STATUS, OFFERING_STATUS, OFFERING_SUBSCRIPTION_STATUS } from './subscriber.offering.constants';

const MOBILE_PLAN_NAMES = {
  MOBILE_SMS: 'Mobil SMS',
  MOBILE_VOICE: 'Mobil Voice',
  MOBILE_CONNECTION: 'Mobil Connection',
  DATA_PROMO: 'Data Promo',
  MOBILE_DATA: 'Mobil Data',
  COAX_SPEED: 'Coax Speed',
  MOBILE_DATA_PROMO: 'Mobilt Data Promo'
};

const PENNY_PLAY_NAME = 'Penny Play';

export function CycleTypeToUse(cycleTypes, value) {
  return cycleTypes.find((type) => {
    return type.Value === String(value);
  });
}

export const determineStatusFromTopLevel = (isDbss, status) => {
  const offeringStatusType = isDbss ? OFFERING_STATUS : OFFERING_SUBSCRIPTION_STATUS;
  let resultStatus;

  switch (status) {
  case offeringStatusType.PENDING_ACTIVE:
    resultStatus = OFFERING_OVERALL_STATUS.ORDER_PENDING;
    break;
  case offeringStatusType.SUSPENDED:
    resultStatus = OFFERING_OVERALL_STATUS.PLAN_SUSPENDED;
    break;
  default:
    resultStatus = OFFERING_OVERALL_STATUS.ACTIVE;
  }

  return resultStatus;
};

const determineIfPendingDowngrade = (offerOptions) => {
  if (offerOptions && offerOptions.length) {
    const byDecisionId = groupBy(prop('OfferingOptionId'))(offerOptions);

    const multipleDecisions = Object.values(byDecisionId).find((list) => {
      return list.length > 1;
    });

    const hasActiveDecision = multipleDecisions && multipleDecisions.some((decision) => {
      return decision.Status === OFFERING_OVERALL_STATUS.ACTIVE;
    });

    const hasPendingOption = multipleDecisions && multipleDecisions.some((decision) => {
      return decision.Status === OFFERING_OVERALL_STATUS.ORDER_PENDING;
    });

    return hasActiveDecision && hasPendingOption;
  }
};

const determineIfPendingPause = (topLevelStatus, primaryOption) => {
  const primaryOptionRenew = path(['SubscriberProductExpiration', 'CanOptIn'], primaryOption);
  return (topLevelStatus === OFFERING_OVERALL_STATUS.ACTIVE && (isEmpty(primaryOption) || primaryOptionRenew));
};

const filterValidPlanNames = (planName) =>
  planName !== MOBILE_PLAN_NAMES.MOBILE_SMS &&
  planName !== MOBILE_PLAN_NAMES.MOBILE_VOICE &&
  planName !== MOBILE_PLAN_NAMES.MOBILE_CONNECTION &&
  planName !== MOBILE_PLAN_NAMES.DATA_PROMO &&
  planName !== MOBILE_PLAN_NAMES.MOBILE_DATA_PROMO;

const filterDataOptions = (offer) => {
  const options = offer.Options ? offer.Options.filter((option) => filterValidPlanNames(option.PlanName)) : [];
  return options.sort((a, b) => new Date(b.ConnectedDate) - new Date(a.ConnectedDate))[0];
};

export const GetOverallStatus = (isDbss, topLevelStatus, primaryOption, offerOptions, isPennyPlay = false, hasFirstUsage = false, paymentFailureRequest, inGracePeriod) => {
  let overallStatus;

  const primaryOptionRenew = !(pathOr(false, ['SubscriberProductExpiration', 'RenewalDisabled'], primaryOption));
  const pendingDowngrade = determineIfPendingDowngrade(offerOptions);
  const pendingPause = determineIfPendingPause(topLevelStatus, primaryOption);

  if (isPennyPlay && topLevelStatus === OFFERING_OVERALL_STATUS.ACTIVE) {
    overallStatus = OFFERING_OVERALL_STATUS.ACTIVE;
  } else if (topLevelStatus === OFFERING_OVERALL_STATUS.ORDER_PENDING && pendingDowngrade) {
    overallStatus = OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE;
  } else if (pendingPause) {
    overallStatus = OFFERING_OVERALL_STATUS.PENDING_PRIMARY_PAUSE;
  } else if (topLevelStatus === OFFERING_STATUS.SUSPENDED || (topLevelStatus === OFFERING_STATUS.ACTIVE && ((paymentFailureRequest && !inGracePeriod) || !path(['SubscriberProductExpiration'], primaryOption)) && hasFirstUsage)) {
    overallStatus = OFFERING_OVERALL_STATUS.SUSPENDED;
  } else if (topLevelStatus === OFFERING_OVERALL_STATUS.ORDER_PENDING && primaryOptionRenew) {
    overallStatus = determineStatusFromTopLevel(isDbss, topLevelStatus);
  } else if (primaryOption && !primaryOptionRenew) {
    overallStatus = OFFERING_OVERALL_STATUS.PENDING_PRIMARY_REMOVAL;
  } else if ((primaryOption && primaryOption.Status === OFFERING_OVERALL_STATUS.ACTIVE) || (!primaryOption && !isPennyPlay && topLevelStatus === OFFERING_OVERALL_STATUS.ACTIVE)) {
    overallStatus = OFFERING_OVERALL_STATUS.ACTIVE;
  } else {
    overallStatus = OFFERING_OVERALL_STATUS.PENDING_REMOVAL;
  }

  return overallStatus;
};

export const GetDisplayName = (activePrimaryDecisionOption, offer, isWireless, topLevelStatus) => {
  let displayName;
  let dataOption;
  const STUDENT = 'Student ';
  const BLACK_FRIDAY = 'Black Friday ';

  if (activePrimaryDecisionOption) {
    if (isEmpty(activePrimaryDecisionOption)) {
      dataOption = filterDataOptions(offer.Options);
      displayName = dataOption ?
        pathOr(null, ['PlanName'], dataOption) :
        pathOr(null, ['DisplayName'], offer);
    } else {
      displayName = pathOr(null, ['PlanName'], activePrimaryDecisionOption);
    }
  } else if (!activePrimaryDecisionOption && isWireless && topLevelStatus !== OFFERING_OVERALL_STATUS.ORDER_PENDING && offer.Options.length <= 4) {
    dataOption = filterDataOptions(offer.Options);
    displayName = pathOr(null, ['PlanName'], dataOption);
  } else {
    let plan = offer.Options.filter((option) => option.ProductName === MOBILE_PLAN_NAMES.MOBILE_DATA || option.ProductName === MOBILE_PLAN_NAMES.COAX_SPEED || option.ProductName === PENNY_PLAY_NAME);
    plan = [...plan];
    plan = plan.sort((a, b) => new Date(b.ConnectedDate) - new Date(a.ConnectedDate))[0];
    displayName = pathOr(null, ['PlanName'], plan);
  }

  if (displayName) {
    if (displayName.includes(STUDENT)) {
      displayName = displayName.replace(STUDENT, '');
    } else if (displayName.includes(BLACK_FRIDAY)) {
      displayName = displayName.replace(BLACK_FRIDAY, '');
    }
  }

  return displayName;
};

export const GetSmsAndVoiceIds = (offer, isWireless) => {
  if (isWireless) {
    const smsOption = offer.Options.find((option) => option.PlanName === MOBILE_PLAN_NAMES.MOBILE_SMS);
    const voiceOption = offer.Options.find((option) => option.PlanName === MOBILE_PLAN_NAMES.MOBILE_VOICE);
    if (!smsOption && !voiceOption) {
      return [];
    }
    if (smsOption && !voiceOption) {
      return [smsOption.OfferingOptionId];
    }
    if (!smsOption && voiceOption) {
      return [voiceOption.OfferingOptionId];
    }
    return [smsOption.OfferingOptionId, voiceOption.OfferingOptionId];
  }
  return [];
};
