import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';
import { SearchServicesData } from './search.services.selectors';

export const SearchServicesTypes = {
  SearchServices: CreateAsyncFromString('SEARCH_SERVICES')
};

export const SearchServices = (msisdn) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SearchServicesTypes.SearchServices, {
      method: 'post',
      url: 'subscriber/SearchServices'
    }, {
      PageNumber: 1,
      PageSize: 10,
      SearchIdentifier: msisdn
    });
  };
};

export const SearchServicesIfNotAvailable = (msisdn) => {
  return (dispatch, getState) => {
    const serviceData = SearchServicesData(getState());

    if (!serviceData[msisdn]) {
      dispatch(SearchServices(msisdn));
    }
  };
};
