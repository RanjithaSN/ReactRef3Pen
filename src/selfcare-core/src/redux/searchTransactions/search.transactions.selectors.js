import { SubscriberApi } from '../ascendon/ascendon.selectors';
import pathOr from 'ramda/src/pathOr';
import pick from 'ramda/src/pick';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberOfferings } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.selectors';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([SubscriberApi], (subscriberApi) => {
  return pathOr(null, ['searchTransactions'], subscriberApi);
});

export const Transactions = createSelector([Base], (base) => {
  return pathOr(EMPTY_ARRAY, ['transactions'], base).filter((item) => item);
});

export const TransactionDetails = createSelector([Base], (base) => {
  return pathOr(EMPTY_ARRAY, ['transactionDetails'], base).filter(
    (item) => item
  );
});

export const IsLoadingTransactions = createSelector([Base], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const PageData = createSelector([Base], (base) => {
  return pick(['pageCount', 'recordCount'], base);
});

export const TransactionDetailsWithDiscounts = createSelector(
  [TransactionDetails, SubscriberOfferings],
  (transactionDetails, offerings) => {
    const allDiscounts = offerings.flatMap((offering) => pathOr([], ['OfferingDetail', 'Options'], offering).flatMap((option) => pathOr([], ['Discounts'], option)));
    const mappedTransactionDetails = transactionDetails.map((transaction) => {
      const appliedItems = pathOr(
        [],
        ['Transaction', 'PurchaseOrder', 'Items', 0, 'AppliedItems'],
        transaction
      );
      const transactionDiscounts = allDiscounts.filter((discount) => {
        const matchingItems = appliedItems.filter(
          (item) => item.DiscountId === discount.DiscountId &&
            item.LockerItemId === discount.SubscriberProductId
        );
        const hasMatchingItems = !!matchingItems;
        return hasMatchingItems;
      });
      return {
        Discount: transactionDiscounts[0],
        Transaction: transaction.Transaction
      };
    });
    return mappedTransactionDetails;
  }
);
