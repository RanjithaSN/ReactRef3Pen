import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Client } from '../client.selectors';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['login'], client);
});

export const ShouldShowSessionExpiration = createSelector([
  Base
], (login) => {
  return pathOr(false, ['shouldShowSessionExpiration'], login);
});

export const IsLoginModalOpen = createSelector([
  Base
], (login) => {
  return pathOr(false, ['isLoginModalOpen'], login);
});
