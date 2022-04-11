import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';


export const SubscriberInventoryTypes = {
  SearchSubscriberInventory: CreateAsyncFromString('SEARCH_SUBSCRIBER_INVENTORY')
};

export const SearchSubscriberInventory = () => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SubscriberInventoryTypes.SearchSubscriberInventory, {
      method: 'post',
      url: 'Subscriber/SearchSubscriberInventory'
    });
  };
};
