import { CreateAsyncFromString } from '../utils/action.creator';
import { tele2ThunkHelper } from '../utils/thunk.helpers';

export const FeasibilityTypes = {
  CLEAR_ADDRESSES: 'CLEAR_ADDRESSES',
  FETCH_ADDRESS: CreateAsyncFromString('FETCH_ADDRESS'),
  FETCH_ADDRESSES: CreateAsyncFromString('FETCH_ADDRESSES'),
  RETRIEVE_SUBSCRIBER_OFFERS: CreateAsyncFromString('RETRIEVE_SUBSCRIBER_OFFERS'),
  SET_FEASIBILITY_SERVICE_ID: 'SET_FEASIBILITY_SERVICE_ID'
};

export const ClearAddresses = () => ({
  type: FeasibilityTypes.CLEAR_ADDRESSES
});

export const FetchAddressById = (addressId) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), FeasibilityTypes.FETCH_ADDRESS, {
      auth: true,
      method: 'get',
      url: `fetchAddressById/${addressId}`
    });
  };
};

export const FetchAddressesByPostalCode = (postalCode) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), FeasibilityTypes.FETCH_ADDRESSES, {
      auth: false,
      method: 'get',
      url: `fetchAddressByPostCode/${postalCode}`
    });
  };
};

export const RetrieveSubscriberOffers = (addressId, unitName = null) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS, {
      auth: false,
      method: 'get',
      url: `retrieveSubscriberOffers/${addressId}${unitName ? `?unitname=${unitName}` : ''}`
    }, {
      addressId,
      unitName
    });
  };
};

export const SetFeasibilityServiceId = (serviceId) => ({
  type: FeasibilityTypes.SET_FEASIBILITY_SERVICE_ID,
  payload: serviceId
});