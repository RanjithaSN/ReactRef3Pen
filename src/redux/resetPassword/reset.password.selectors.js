import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { Client } from '../client.selectors';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['resetPassword'], client);
});

export const ResetPasswordIsUpdating = createSelector([
  Base
], (resetPassword) => {
  return pathOr(false, ['isUpdating'], resetPassword);
});

export const FromResetPasswordPage = createSelector([
  Base
], (resetPassword) => {
  return pathOr(false, ['fromResetPasswordPage'], resetPassword);
});
