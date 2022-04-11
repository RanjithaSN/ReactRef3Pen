import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { ExistingPlanQuantitiesByServiceId } from '../../addOns/add.ons.selectors';
import { NonZeroAddOnCartItems } from '../../cart/cart.add.ons.selectors';
import { nonNullAmount, oneTimeRuleFilter, PeriodLocaleStringFormatter, recurringRuleFilter } from './summary.helpers';

export const AddOnCartSummaryItems = createSelector(
  NonZeroAddOnCartItems,
  ExistingPlanQuantitiesByServiceId,
  PeriodLocaleStringFormatter,
  (items, existingPlanLookup, getPeriodLocaleStrings) => (
    items.map((item) => {
      const { Details: { Product, PricingPlan }, ServiceFeatureProductAssociation: { ServiceIdentifierValue }, Quantity } = item;
      const { BillerRuleInstanceThumbnails } = PricingPlan;
      const { Name, Services: [service] } = Product;
      const existingQuantity = pathOr(0, [service.Id, ServiceIdentifierValue, Product.Id, PricingPlan.Id], existingPlanLookup);
      const actualQuantity = Quantity - existingQuantity;
      const filterRecurringInstance = recurringRuleFilter(nonNullAmount);
      const filterOneTimeInstance = oneTimeRuleFilter(nonNullAmount);
      const recurringInstances = filterRecurringInstance(BillerRuleInstanceThumbnails);
      const oneTimeInstances = filterOneTimeInstance(BillerRuleInstanceThumbnails);

      return ({
        id: `${ServiceIdentifierValue}:${Product.Id}:${PricingPlan.Id}`,
        name: Name,
        oneTimeTotal: oneTimeInstances.reduce((result, { Amount }) => result + Amount, 0) * actualQuantity,
        quantity: actualQuantity,
        totals: recurringInstances
          .map((instance) => ({
            amount: instance.Amount * actualQuantity,
            label: getPeriodLocaleStrings(instance).join(' ')
          }))
      });
    })
  )
);
