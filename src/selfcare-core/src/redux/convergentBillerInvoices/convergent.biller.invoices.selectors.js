import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import parse from 'date-fns/parse';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['invoices'], subscriberApi);
});

export const ConvergentBillerInvoiceSummary = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const ConvergentBillerInvoices = createSelector([
  ConvergentBillerInvoiceSummary
], (summary) => {
  return pathOr(null, ['Invoices'], summary);
});

export const MostRecentConvergentBillerInvoice = createSelector([
  ConvergentBillerInvoices
], (invoices) => {
  if (invoices) {
    return invoices.reduce((recent, invoice) => {
      return recent && parse(recent.IssueDate) > parse(invoice.IssueDate) ? recent : invoice;
    }, null);
  }
  return null;
});

export const ConvergentBillerAreInvoicesAvailable = createSelector([
  ConvergentBillerInvoices
], (invoices) => {
  return Boolean(invoices && invoices.length);
});
