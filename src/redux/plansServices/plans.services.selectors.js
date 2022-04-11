import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import { IsDbss } from '@selfcare/core/redux/configuration/configuration.selectors';
import { OFFERING_STATUS, OFFERING_SUBSCRIPTION_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import merge from 'ramda/src/merge';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { FormattedSubscriberOfferings } from '../subscriberOfferings/subscriber.offerings.selectors';

const isOfferingRemoved = (isDbss, status) => {
  const offeringStatusType = isDbss ? OFFERING_STATUS : OFFERING_SUBSCRIPTION_STATUS;
  return offeringStatusType.REMOVED === status;
};

const isActiveAndRecurringAmount = (amount) => {
  return amount.Type === BILLER_RULE_INSTANCE_TYPES.RECURRING && amount.Status !== OFFERING_STATUS.REMOVED;
};

const copyBulkPropsToBillerTypeAmounts = (options) => {
  return options.map((option) => {
    const billerItemBulkPrices = pathOr([], ['BillerItemBulkPrices'], option);
    const billerTypeAmounts = pathOr([], ['BillerTypeAmounts'], option);
    const { Amount, BillerRuleConfigurationId, BulkType, TotalAmount, Quantity } = billerItemBulkPrices.find(({ Type }) => Type === BILLER_RULE_INSTANCE_TYPES.RECURRING) || {};

    const billerTypeAmountsResult = billerTypeAmounts.map((amount) => {
      if (isActiveAndRecurringAmount(amount) && amount.BillerRuleConfigurationId === BillerRuleConfigurationId) {
        return merge(amount, {
          BulkAmount: Amount,
          BulkTotalAmount: TotalAmount,
          BulkType,
          Quantity
        });
      }
      return amount;
    });
    return {
      ...option,
      BillerTypeAmounts: billerTypeAmountsResult
    };
  });
};

export const Offerings = createSelector([
  IsDbss,
  FormattedSubscriberOfferings
], (isDbss, subscriberOfferings) => {
  return subscriberOfferings
    .filter((offering) => !isOfferingRemoved(isDbss, offering.Status))
    .map((offering) => ({
      ...offering,
      Options: copyBulkPropsToBillerTypeAmounts(offering.Options)
    }));
});
