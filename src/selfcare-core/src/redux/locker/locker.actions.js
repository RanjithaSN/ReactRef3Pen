import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const LockerTypes = {
  SearchLocker: CreateAsyncFromString('SEARCH_LOCKER')
};

export const SearchLocker = () => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), LockerTypes.SearchLocker, {
      method: 'post',
      url: 'subscriber/SearchLocker'
    }, {
      IncludeRemoved: true
    });
  };
};
