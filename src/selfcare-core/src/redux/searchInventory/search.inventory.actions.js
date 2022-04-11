import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';
import { SEARCH_INVENTORY_CONSTANTS } from './search.inventory.constants';
import { MSISDNInventoryItems } from './search.inventory.selectors';

export const SearchInventoryTypes = {
  CLEAR_MSISDN_INVENTORY: 'CLEAR_MSISDN_INVENTORY',
  SEARCH_MSISDN_INVENTORY: CreateAsyncFromString('SEARCH_MSISDN_INVENTORY')
};

export const SearchMSISDNInventory = () => {
  return (dispatch, getState) => {
    if (!MSISDNInventoryItems(getState()).length) {
      const pageSize = 3;
      return apiThunkHelper(dispatch, getState(), SearchInventoryTypes.SEARCH_MSISDN_INVENTORY, {
        url: 'Subscriber/SearchInventory'
      }, {
        InventoryTypeExternalReference: SEARCH_INVENTORY_CONSTANTS.MSISDN,
        PageSize: pageSize
      });
    }
  };
};

export const ClearMSISDNInventory = () => ({
  type: SearchInventoryTypes.CLEAR_MSISDN_INVENTORY
});
