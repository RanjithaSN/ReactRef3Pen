import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const SearchOrdersTypes = {
  SearchOrders: CreateAsyncFromString('SEARCH_ORDERS')
};

export const SearchOrders = (options = {}) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SearchOrdersTypes.SearchOrders, {
      method: 'post',
      url: 'subscriber/SearchOrders'
    }, {
      ...options
    });
  };
};
