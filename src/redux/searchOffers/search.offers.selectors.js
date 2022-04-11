import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Client } from '../client.selectors';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['searchOffers'], client);
});

export const EligibilityModalDismissed = createSelector([
  Base
], (base) => {
  return pathOr(false, ['eligibilityModalDismissed'], base);
});
