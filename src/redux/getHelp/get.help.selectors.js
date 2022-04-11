import { Client } from '../client.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['getHelp'], client);
});

export const HelpOverlaySubpage = createSelector([
  Base
], (getHelp) => {
  return pathOr(null, ['overlaySubpage'], getHelp);
});

export const HelpOverlayPrimaryId = createSelector([
  Base
], (getHelp) => {
  return pathOr(null, ['overlayPrimaryId'], getHelp);
});

export const ShowInaccountHelpList = createSelector([
  Base
], (getHelp) => {
  return pathOr(null, ['showInaccountHelpList'], getHelp);
});

export const IsLoadingInaccountList = createSelector([
  Base
], (getHelp) => {
  return pathOr(null, ['isLoadingInaccountList'], getHelp);
});

export const InaccountHelpList = createSelector([
  Base
], (getHelp) => {
  return pathOr(null, ['inaccountHelpList'], getHelp);
});

