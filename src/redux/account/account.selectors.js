import { ConvergentBillerManagedAccountsData, ConvergentBillerSummaryData } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.selectors';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { Client } from '../client.selectors';
import { ConvergentBillerManagedAccountSummary } from '../convergentBiller/convergent.biller.selectors';

export const ACCOUNT_TYPES = {
  MANAGED: 99999,
  POSTPAID: 1,
  PREPAID: 0
};

const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['account'], client);
});

export const CurrentAccountId = createSelector([
  Base
], (base) => pathOr(null, ['currentAccount'], base));

export const ManagedAccountObjects = createSelector([
  CurrentAccountId,
  ConvergentBillerManagedAccountsData,
  ConvergentBillerManagedAccountSummary
], (currentAccountId, managedAccounts, managedSummaryData) => {
  const accountIds = Object.keys(managedAccounts);
  const outputArray = [];
  accountIds.forEach((id) => {
    const subscriberAccount = managedAccounts[id];
    const managedAccountSummaries = pathOr(null, [id, 'AccountSummaries'], managedSummaryData);

    pathOr(EMPTY_ARRAY, ['Accounts'], subscriberAccount).forEach((accountData) => {
      const managedAccountSummary = managedAccountSummaries ? managedAccountSummaries.find((summary) => summary.AccountNumber === accountData.AccountNumber) : null;
      const date = pathOr(null, ['PostpaidDetails', 'DueDate'], managedAccountSummaries) || pathOr(null, ['Services', 0, 'RenewDates', 0, 'Date'], managedAccountSummaries);

      if (managedAccountSummary !== undefined) {
        outputArray.push({
          accountNumber: accountData.AccountNumber,
          accountType: ACCOUNT_TYPES.MANAGED,
          balance: path(['PostpaidDetails', 'Balance'], managedAccountSummary),
          currencyCode: path(['PostpaidDetails', 'CurrencyCode'], managedAccountSummary),
          dueDate: date,
          managedAccountType: accountData.AccountType,
          managedAccountName: subscriberAccount.NodeName,
          selectedAccount: (accountData.AccountNumber === currentAccountId),
          hierarchyId: subscriberAccount.HierarchyId,
          hierarchyName: subscriberAccount.HierarchyName,
          subscriberId: subscriberAccount.SubscriberId,
          ...managedAccountSummary
        });
      }
    });
  });
  return outputArray.filter(({ managedAccountType }) => (managedAccountType in [ACCOUNT_TYPES.POSTPAID, ACCOUNT_TYPES.PREPAID]));
});

export const CurrentManagedAccountObject = createSelector([
  ManagedAccountObjects
], (managedAccountList) => (managedAccountList.find((accountSummary) => accountSummary.selectedAccount) || null));

export const CurrentAccount = createSelector([
  CurrentAccountId,
  ConvergentBillerSummaryData,
  CurrentManagedAccountObject
], (currentAccountId, convergentBillerSubscriberSummary, currentManagedAccount) => {
  if ((currentAccountId === null)) {
    return null;
  }

  const currentAccount = convergentBillerSubscriberSummary && convergentBillerSubscriberSummary.AccountSummaries ?
    convergentBillerSubscriberSummary.AccountSummaries.find((accountSummary) => {
      return accountSummary.AccountNumber === currentAccountId;
    }) : null;

  return currentAccount || currentManagedAccount || null;
});

export const CurrentAccountIsManaged = createSelector([
  CurrentAccount
], (currentAccount) => {
  return currentAccount === null ? false : (currentAccount.subscriberId !== undefined);
});

export const CurrentManagedAccountSubscriberId = createSelector([
  CurrentAccountIsManaged,
  CurrentManagedAccountObject
], (accountIsManaged, managedAccount) => {
  return accountIsManaged ? managedAccount.subscriberId : undefined;
});

export const ManagedAccountSubscriberId = createSelector([
  CurrentManagedAccountObject
], (managedAccount) => {
  return path(['subscriberId'], managedAccount);
});

export const Services = createSelector(
  CurrentAccount,
  (account) => (
    pathOr(EMPTY_ARRAY, ['Services'], account)
      .filter((service) => !GUID_REGEX.test(service.ServiceIdentifier.Value))
  )
);

export const SubscriberAndAccountsIsLoaded = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isRetrieveSubscriberAndAccountsLoaded'], base);
});
