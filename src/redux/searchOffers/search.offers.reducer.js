import Immutable from 'seamless-immutable';
import { SearchOffersActionTypes } from './search.offers.actions';

export const INITIAL_STATE = new Immutable({
  eligibilityModalDismissed: false,
  facets: []
});

export default function SearchOffers(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case SearchOffersActionTypes.UPDATE_SELECTED_FACETS:
    return state.set('facets', payload);
  case SearchOffersActionTypes.CLEAR_MARKETING_TEMPLATE_FILTERS:
    return state.set('facets', INITIAL_STATE.facets);
  case SearchOffersActionTypes.DISMISS_ELIGIBILITY_MODAL:
    return state.set('eligibilityModalDismissed', true);
  default:
    return state;
  }
}
