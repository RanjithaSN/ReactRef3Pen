import { FallbackCurrencyLocale } from '@selfcare/core/constants/transaction.constants';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import { CONFIGURATION } from '../../constants/configuration.constants';
import { ConvergentBiller } from '../convergentBilling/convergent.billing.selectors';
import { CODES } from '../metadata/codes/codes.constants';
import { CodeItems } from '../metadata/codes/codes.selectors';
import { SelectedLocale } from '../preferences/preferences.selectors';

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

const Base = createSelector([
  ConvergentBiller
], (convergentBiller) => {
  return pathOr(null, ['usageDetails'], convergentBiller);
});

export const ConvergentBillerAccountUsageLoading = createSelector(
  Base, (base) => pathOr(EMPTY_OBJECT, ['status'], base)
);

export const AllProductsUsageLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['allProductsUsageIsLoading'], base);
});

export const ConvergentBillerAccountUsageItems = createSelector([
  Base
], (base) => {
  return pathOr(EMPTY_OBJECT, ['usageItems'], base);
});

export const AllowancesAcrossProducts = createSelector([
  ConvergentBillerAccountUsageItems,
  CodeItems(CODES.NetworkEventType),
  SelectedLocale
], (usageItems, networkEventTypes, locale) => {
  const usageKeys = Object.keys(usageItems);
  let usageList = [];
  usageKeys.forEach((key) => {
    usageList = usageList.concat(pathOr(EMPTY_ARRAY, [key], usageItems).filter((item) => item.EntitlementName === CONFIGURATION.ALLOWANCE_ENTITLEMENT_NAME));
  });
  return usageList.map((usage) => {
    const foundNetworkEventType = networkEventTypes.find((type) => (type.Value === usage.NetworkEventTypeCode));
    return {
      date: formatDate(usage.EventStartTime, locale),
      sender: usage.Sender,
      receiver: usage.Receiver,
      amount: formatCurrency(usage.UsageAmount, FallbackCurrencyLocale, locale, false),
      type: pathOr('', ['Name'], foundNetworkEventType)
    };
  });
});
