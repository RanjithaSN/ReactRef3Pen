import { Client } from '../client.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';

const Base = createSelector(
  Client,
  (client) => {
    return pathOr(null, ['inAccountHelp'], client);
  }
);

export const Page1 = createSelector(
  Base,
  (base) => {
    return pathOr(null, ['page1'], base);
  }
);

export const Page2 = createSelector(
  Base,
  (base) => {
    return pathOr(null, ['page2'], base);
  }
);

export const HelpArticle = createSelector(
  Base,
  (base) => {
    return pathOr(null, ['helpArticle'], base);
  }
);
