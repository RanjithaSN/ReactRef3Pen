import { AreConvergentBillerManagedAccountsLoading, IsConvergentBillerSummaryLoading } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Client } from '../client.selectors';


export const ConvergentBillerBase = createSelector([
  Client
], (client) => pathOr(null, ['convergentBiller'], client));

export const ConvergentBillerManagedAccount = createSelector([
  ConvergentBillerBase
], (base) => pathOr(null, ['managedAccount'], base));

export const ConvergentBillerManagedAccountLoading = createSelector([
  ConvergentBillerManagedAccount
], (managedAccount) => pathOr(false, ['isLoading'], managedAccount));

export const ConvergentBillerManagedAccountSummary = createSelector([
  ConvergentBillerManagedAccount
], (managedAccount) => pathOr(null, ['data'], managedAccount));

export const ConvergentBillerAccountsLoading = createSelector([
  AreConvergentBillerManagedAccountsLoading,
  IsConvergentBillerSummaryLoading,
  ConvergentBillerManagedAccountLoading
], (accountsLoading, summaryLoading, managedAccountsLoading) => accountsLoading || summaryLoading || managedAccountsLoading);
