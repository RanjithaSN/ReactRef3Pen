import * as SessionStorageHelper from '@selfcare/core/helpers/storage/session.storage';
import { MSISDN_NUMBERS } from '@selfcare/core/redux/utils/api.constants';
import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SearchInventoryTypes } from './search.inventory.actions';
import { SEARCH_INVENTORY_CONSTANTS } from './search.inventory.constants';

export const INITIAL_STATE = new Immutable({
  data: {
    [SEARCH_INVENTORY_CONSTANTS.MSISDN]: SessionStorageHelper.read(MSISDN_NUMBERS) || undefined
  },
  isLoading: false
});

export default function SearchInventoryReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SearchInventoryTypes.SEARCH_MSISDN_INVENTORY.BEGIN:
    return state.set('isLoading', true);
  case SearchInventoryTypes.SEARCH_MSISDN_INVENTORY.SUCCESS:
    return state
      .set('isLoading', false)
      .setIn(['data', SEARCH_INVENTORY_CONSTANTS.MSISDN], payload.InventoryItems);
  case SearchInventoryTypes.CLEAR_MSISDN_INVENTORY:
    return state
      .set('isLoading', false)
      .setIn(['data', SEARCH_INVENTORY_CONSTANTS.MSISDN], undefined);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SearchInventoryTypes.SEARCH_MSISDN_INVENTORY.BEGIN:
      return state.set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
