import Immutable from 'seamless-immutable';
import pathOr from 'ramda/src/pathOr';
import * as LocalStorageHelper from '../../helpers/storage/local.storage';
import { FaultTypes } from '../fault/fault.actions';
import { ELIGIBILITY_ADDRESS } from '../utils/api.constants';
import { SearchOfferTypes } from './search.offers.actions';

export const INITIAL_STATE = new Immutable({
  address: LocalStorageHelper.read(ELIGIBILITY_ADDRESS),
  data: {
    Offerings: []
  },
  isLoading: false,
  rememberLocation: Boolean(LocalStorageHelper.read(ELIGIBILITY_ADDRESS))
});

export default function SearchOffersReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SearchOfferTypes.ClearSearchOfferings:
    return state
      .set('data', INITIAL_STATE.data)
      .set('isLoading', false);
  case SearchOfferTypes.SearchOfferings.BEGIN:
    return state
      .set('isLoading', true);
  case SearchOfferTypes.SearchOfferings.SUCCESS: {
    const incomingList = pathOr([], ['Offerings'], payload);
    const incomingIds = incomingList.map((offering) => offering.Id);
    const filteredArray = state.data.Offerings.filter((offering) => !incomingIds.includes(offering.Id));

    return state
      .set('data', {
        Offerings: filteredArray.concat(incomingList)
      })
      .set('isLoading', false);
  }
  case SearchOfferTypes.UpdateAddress:
    return state
      .set('address', payload.address)
      .set('rememberLocation', payload.rememberLocation);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SearchOfferTypes.SearchOfferings.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
