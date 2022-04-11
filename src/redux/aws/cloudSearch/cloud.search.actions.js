import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cloudSearchThunkHelper } from '@selfcare/core/redux/utils/thunk.helpers';


export const CloudSearchTypes = {
  ClearSearchResults: 'ClearSearchResults',
  FetchSearchResults: CreateAsyncFromString('FETCH_SEARCH_RESULTS')
};


export const RetrieveSearchResults = (queryParam) => (dispatch) => {
  return cloudSearchThunkHelper(dispatch, CloudSearchTypes.FetchSearchResults, {
    method: 'GET',
    queryParam: `?q=${queryParam}`
  });
};

export const ClearSearchResults = () => ({
  type: CloudSearchTypes.ClearSearchResults
});
