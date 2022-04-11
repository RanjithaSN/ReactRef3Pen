import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const AddressActionTypes = {
  REMOVE_ADDRESS: CreateAsyncFromString('REMOVE_ADDRESS'),
  RETRIEVE_ADDRESSES: CreateAsyncFromString('RETRIEVE_ADDRESSES')
};

export const RetrieveAddresses = () => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), AddressActionTypes.RETRIEVE_ADDRESSES, {
      method: 'post',
      url: 'subscriber/RetrieveAddresses'
    }, {
      IncludeRemoved: false
    });
  };
};

export const RemoveAddress = (addressId) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), AddressActionTypes.REMOVE_ADDRESS, {
      method: 'post',
      url: 'subscriber/RemoveAddress'
    }, {
      Id: addressId
    });
  };
};
