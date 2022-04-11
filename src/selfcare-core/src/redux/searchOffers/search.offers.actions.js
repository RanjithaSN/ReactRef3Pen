import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';
import { RememberLocation } from './search.offers.selectors';

export const SearchOfferTypes = {
  ClearSearchOfferings: 'CLEAR_SEARCH_OFFERINGS',
  SearchOfferings: CreateAsyncFromString('SEARCH_OFFERINGS'),
  UpdateAddress: 'UPDATE_ADDRESS'
};

export const SearchOffers = (options = {}) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SearchOfferTypes.SearchOfferings, {
      method: 'post',
      url: 'subscriber/SearchOfferings'
    }, {
      ...options
    });
  };
};

export const ClearSearchOfferings = () => ({
  type: SearchOfferTypes.ClearSearchOfferings
});

export const UpdateAddress = (address, rememberLocation) => ({
  type: SearchOfferTypes.UpdateAddress,
  payload: {
    address,
    rememberLocation
  }
});

export const UpdateAddressAndSearchOffers = (value) => {
  return async (dispatch, getState) => {
    dispatch(UpdateAddress(value, RememberLocation(getState())));

    await dispatch(SearchOffers());
  };
};
