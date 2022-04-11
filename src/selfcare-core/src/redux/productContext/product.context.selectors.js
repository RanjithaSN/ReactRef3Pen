import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

export const Base = createSelector(
  SubscriberApi,
  (client) => (
    pathOr(null, ['productContext'], client)
  )
);
