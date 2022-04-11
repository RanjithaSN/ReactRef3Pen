import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { createSelector } from 'reselect';
import { Client } from '../client.selectors';

const EMPTY_ARRAY = [];

const Base = createSelector([
  Client
], (client) => path(['troubleshooter'], client));

export const GetHistory = createSelector([
  Base
], (troubleshooter) => pathOr(EMPTY_ARRAY, ['History'], troubleshooter));
