import { SortDirection } from '../../constants/sort.direction.constants';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';
import { SEARCH_ENTITIES } from './catalog.constants';

export const CatalogTypes = {
  SearchCatalog: CreateAsyncFromString('SEARCH_CATALOG')
};

export const SearchCatalog = ({ serviceId, sortBy, productClassification }, actions = CatalogTypes.SearchCatalog) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), actions, {
      method: 'post',
      url: 'subscriber/SearchCatalog'
    }, {
      ProductFilter: {
        ProductClassification: productClassification,
        ServiceId: serviceId
      },
      ProductSort: {
        SortBy: sortBy,
        SortDirection: SortDirection.ASCENDING
      },
      SearchEntities: [SEARCH_ENTITIES.PRODUCT]
    });
  };
};
