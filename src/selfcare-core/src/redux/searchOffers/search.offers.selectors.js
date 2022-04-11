import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { SubscriberApi } from '../ascendon/ascendon.selectors';

const EMPTY_ARRAY = Immutable([]);
const EMPTY_OBJECT = {};

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['offering'], subscriberApi);
});

export const SearchOffers = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const SearchOffersIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const SearchOffersOfferings = createSelector([
  SearchOffers
], (offer) => {
  return pathOr(EMPTY_ARRAY, ['Offerings'], offer);
});

export const SearchOffersAddress = createSelector([
  Base
], (base) => {
  return pathOr(EMPTY_OBJECT, ['address'], base);
});

export const SearchOffersIsLoaded = createSelector([
  SearchOffers,
  SearchOffersIsLoading
], (data, isLoading) => {
  return data !== null && !isLoading;
});

export const RememberLocation = createSelector([
  Base
], (base) => {
  return pathOr(false, ['rememberLocation'], base);
});
