import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const ProductOrderingTypes = {
  RetrieveSingleProductContext: CreateAsyncFromString('RETRIEVE_SINGLE_PRODUCT_CONTEXT')
};

export const RetrieveSingleProductContext = (
  productId,
  actions = ProductOrderingTypes.RetrieveSingleProductContext
) => (
  (dispatch, getState) => (
    apiThunkHelper(dispatch, getState(), actions, {
      method: 'post',
      url: 'Subscriber/RetrieveProductContext',
      data: {
        IncludeOrderablePricingPlans: true,
        ProductId: productId
      }
    }, {
      ProductId: productId
    })
  )
);
