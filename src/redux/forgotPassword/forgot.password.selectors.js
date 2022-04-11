import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { Client } from '../client.selectors';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['forgotPassword'], client);
});

export const IsSendingEmail = createSelector([
  Base
], (forgotPassword) => {
  return pathOr(false, ['isLoading'], forgotPassword);
});

export const FromForgotPasswordPage = createSelector([
  Base
], (forgotPassword) => {
  return pathOr(false, ['fromForgotPasswordPage'], forgotPassword);
});

export const UserId = createSelector([
  Base
], (forgotPassword) => {
  return pathOr(null, ['userId'], forgotPassword);
});
