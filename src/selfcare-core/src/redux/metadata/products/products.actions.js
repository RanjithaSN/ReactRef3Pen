import LoadingStatus from '../../../constants/loading.status';
import { CreateAsyncFromString } from '../../utils/action.creator';
import { metadataThunkHelper } from '../../utils/thunk.helpers';
import { Product, ProductStatus } from './products.selectors';

export const ProductActionTypes = {
  RETRIEVE_PRODUCT: CreateAsyncFromString('RETRIEVE_PRODUCT')
};

export const RetrieveProduct = (productId) => (
  async (dispatch, getState) => {
    if (ProductStatus(getState(), productId) === LoadingStatus.UNLOADED) {
      return metadataThunkHelper(dispatch, getState(), ProductActionTypes.RETRIEVE_PRODUCT, {
        url: `Product/Id/${productId}`
      }, {
        id: productId
      });
    }

    return Product(getState(), productId);
  }
);
